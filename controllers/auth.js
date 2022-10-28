import jsonMain from "../config/main.json" assert {type: "json"};
import { Translator, emailSend, generateCrypto } from "../config/api.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import Cars from "../models/Car.js";
import User from "../models/User.js";

export function getRegister(req, res) {
	res.render("register");
}

export function postRegister(req, res) {
	const { username, email, password, password2, phone } = req.body;
	let errors = [];
	
	if (!username || !email || !password || !password2 || !phone) {
		errors.push({ msg: Translator.translate("Please fill in all fields") });
	}

	if (password !== password2) {
		errors.push({ msg: Translator.translate("Passwords do not match") });
	}
	
	if (password.length < 8) {
		errors.push({ msg: Translator.translate("Password should be at least 8 characters") });
	}
	
	if (phone.length != 10) {
		errors.push({ msg: Translator.translate("Telephone number should be 10 characters long") });
	}
	
	if (errors.length > 0) {
		res.render("register", { errors, username, email, password, password2, phone });
	} else {
		User.findOne({ email: email }).then(user => {
			if (user) {
				errors.push({ msg: Translator.translate("Email is already registered") });
				res.render("register", { errors, username, email, password, password2, phone });
			} else {
				const newUser = new User({ username, email, password, phone });
				bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save().then(user => {
						const emailLink = `${req.protocol}://${req.headers.host}/auth/verify/${user.token}`;
						emailSend(user.email, "Car Info Email Verification", `
						${Translator.translate("Thank you for registering")}!<br>
						${Translator.translate("Please click this")} <a href=${emailLink}>link</a> ${Translator.translate("to verify your email address")}<br>
						`);
						req.flash("success_msg", Translator.translate("You are registered and must verify your email"));
						res.redirect("/auth/register");
					}).catch(err => console.log(err));
				}));
			};
		});
	};
}

export async function getVerified(req, res) {
	const user = await User.findOne({ token: req.params.token });
	if (!user) return res.sendStatus(404);
	user.verified = true;
	user.token = generateCrypto(64);
	user.save();
	req.flash("success_msg", Translator.translate("You are registered and can log in"));
	res.redirect("/auth/login");
}

export function getPassword(req, res) {
	res.render("password");
}

export async function postPassword(req, res) {
	let errors = [];

	if (!req.body.email || !req.body.password || !req.body.password2) {
		errors.push({ msg: Translator.translate("Please fill in all fields") });
	}

	if (req.body.password.length < 8) {
		errors.push({ msg: Translator.translate("Password should be at least 8 characters") });
	}

	if (req.body.password !== req.body.password2) {
		errors.push({ msg: Translator.translate("Passwords do not match") });
	}

	if (errors.length > 0) {
		res.render("password", { errors, email: req.body.email, password: req.body.password, password2: req.body.password2 });
	} else {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			errors.push(Translator.translate("That email is not registered"));
			res.render("password", { errors, email: req.body.email, password: req.body.password, password2: req.body.password2 });
		} else {
			bcrypt.genSalt(10, (err, salt) => bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) throw err;
				user.password = hash;
				user.save()
				const emailLink1 = `${req.protocol}://${req.headers.host}/auth/password`;
				emailSend(user.email, "Your password was just changed",
				`<b>${Translator.translate("If you haven't changed your password")} ${Translator.translate("click this")} <a href=${emailLink1}>${Translator.translate("link")}</a> ${Translator.translate("to change it now or this")} <a href="mailto:${jsonMain.MAIL_USER}">${Translator.translate("link")}</a> ${Translator.translate("to contact support")}</b>`);
				req.flash("success_msg", "Your password was just changed and can log in");
				res.redirect("/auth/login");
			}));
		}
	}
}

export function getLogin(req, res) {
	res.render("login");
}

export function postLogin(req, res, next) {
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/auth/login",
		failureFlash: true
	})(req, res, next);
}

export function postLogout(req, res, next) {
	req.logout(err => {
		if (err) { return next(err); }
		req.flash("success_msg", Translator.translate("You are logged out"));
		res.redirect("/auth/login");
	});
}

export async function deleteAccount(req, res, next) {
	const cars = await Cars.find();
	cars.filter(car => car.email === req.user.email).forEach(car => {
		Cars.deleteOne({ uuid: car.uuid }, (err) => {
			if (err) { return next(err); }
	    });
    });

    User.deleteOne({ email: req.user.email }, (err) => {
        if (err) { return next(err); }
        req.flash("success_msg", Translator.translate("Your account was deleted"));
        res.redirect("/auth/register");
    });
}