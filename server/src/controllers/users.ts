import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import OTPModel from "../models/otp";
import bcrypt from "bcrypt";
import { generateOTP } from "../utils/generateOTP";
import { sendEmail } from "../utils/sendEmail";
import env from "../utils/validateEnv";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
	try {
		const user = await UserModel.findById(req.session.userId)
			.select("+email")
			.exec();
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

interface SignUpBody {
	username?: string;
	email?: string;
	password?: string;
}

export const signUp: RequestHandler<
	unknown,
	unknown,
	SignUpBody,
	unknown
> = async (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const passwordRaw = req.body.password;

	try {
		if (!username || !email || !passwordRaw) {
			throw createHttpError(400, "Parameters missing");
		}

		const existingUsername = await UserModel.findOne({
			username: username,
		}).exec();

		if (existingUsername) {
			throw createHttpError(
				409,
				"Username already taken. Please choose a different one or log in instead."
			);
		}

		const existingEmail = await UserModel.findOne({ email: email }).exec();

		if (existingEmail) {
			throw createHttpError(
				409,
				"A user with this email address already exists. Please log in instead."
			);
		}

		const passwordHashed = await bcrypt.hash(passwordRaw, 10);

		const newUser = await UserModel.create({
			username: username,
			email: email,
			password: passwordHashed,
		});

		req.session.userId = newUser._id;

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

interface LoginBody {
	username?: string;
	password?: string;
}

export const login: RequestHandler<
	unknown,
	unknown,
	LoginBody,
	unknown
> = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		if (!username || !password) {
			throw createHttpError(400, "Parameters missing");
		}

		const user = await UserModel.findOne({ username: username }).select(
			"+password +email"
		);

		if (!user) {
			throw createHttpError(401, "Invalid credentials");
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw createHttpError(401, "Invalid credentials");
		}

		req.session.userId = user._id;
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const logout: RequestHandler = (req, res, next) => {
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			res.sendStatus(200);
		}
	});
};

export const sendOTP: RequestHandler = async (req, res, next) => {
	try {
		const otp = await generateOTP();
		const otpObj = await OTPModel.create({
			email: `${req.body.email}`,
			otp: otp,
		});
		await sendEmail(
			"Email Verification",
			`
		<h3>Hello, ${req.body.username}!</h3>
		<p>Please verify your account using this one time password: <h4>${otp}</h4></p>
		`,
			`${req.body.email}`,
			`${env.EMAIL_USER}`,
			`${env.EMAIL_USER}`,
		);
		res.status(200).json({ otp: otpObj });
	} catch (error) {
		next(error);
	}
};

export const verifyOTP: RequestHandler = async (req, res, next) => {
	try {
		const otp = await OTPModel.findOne({
			email: req.body.email,
			otp: req.body.otp,
		});
		if (!otp) throw createHttpError(401, "Invalid One Time Password");
		await OTPModel.deleteOne({
			email: req.body.email,
			otp: req.body.otp,
		});
		res.status(200).json({ otp: otp });
	} catch (error) {
		next(error);
	}
};
