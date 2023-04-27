import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { generateOTP } from "../utils/generateOTP";
import { sendEmail } from "../utils/sendEmail";
import env from "../utils/validateEnv";
import { redisClient } from "../app";

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
		).exec();

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

interface PasswordResetBody {
	email?: string;
	password?: string;
	password2?: string;
}

export const passwordReset: RequestHandler<
	unknown,
	unknown,
	PasswordResetBody,
	unknown
> = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;
	
	try {
		if (!email || !password || !password2) {
			throw createHttpError(400, "Parameters missing");
		}

		if (password !== password2) {
			throw createHttpError(401, "Passwords don't match");
		}

		const user = await UserModel.findOne({ email: email }).exec();

		if (!user) {
			throw createHttpError(401, "Invalid credentials");
		}

		const passwordHashed = await bcrypt.hash(password, 10);

		user.password = passwordHashed;

		user.save();

		req.session.userId = user._id;
		res.status(200).json(user);
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
	if (!req.body.email || !req.body.title || !req.body.text) throw createHttpError(401, "Missing Info");
	let username;
	if (!req.body.username) {
		const user = await UserModel.findOne({email: req.body.email}).exec();
		if (!user) throw createHttpError(404, "User does not exist yet");
		username = user.username;
	} else username = req.body.username;

	try {
		const otp = await generateOTP();
		const otpObj = await redisClient.setex(otp, 600, req.body.email);
		sendEmail(
			`${req.body.title}`,
			`
		<h3>Hello, ${username}!</h3>
		<p>${req.body.text} <h4>${otp}</h4></p>
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
		const otp = await redisClient.get(req.body.otp);
		if (!otp || otp !== req.body.email) throw createHttpError(401, "Invalid One Time Password");
		await redisClient.del(req.body.password);
		res.status(200).json({ otp: otp });
	} catch (error) {
		next(error);
	}
};
