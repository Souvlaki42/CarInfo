const { Translator, emailSend, generateCrypto } = require("../config/api");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Cars = require("../models/Car");
const User = require("../models/User");
const { HOST } = require("../config/main.json");

function getRegister(req, res) {
	res.render("register");
}

function postRegister(req, res) {
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
						emailSend(user.email, "Car Info Email Verification", `<b>${Translator.translate("Thank you for registering")}!<br>${Translator.translate("Please click this")} <a href="${HOST}/verify/${user.token}">${Translator.translate("link")}</a> ${Translator.translate("to verify your email address")}</b>`, false);
						req.flash("success_msg", Translator.translate("You are registered and must verify your email"));
						res.redirect("/auth/register");
					}).catch(err => console.log(err));
				}));
			};
		});
	};
}

async function getVerified(req, res) {
	const user = await User.findOne({ token: req.params.token });
	if (!user) return res.sendStatus(404);
	user.verified = true;
	user.token = generateCrypto(64);
	user.save();
	req.flash("success_msg", Translator.translate("You are registered and can log in"));
	res.redirect("/auth/login");
}

function getPassword(req, res) {
	res.render("password");
}

async function postPassword(req, res) {
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
		res.render("settings", { errors, email: req.body.email, password: req.body.password, password2: req.body.password2 });
	} else {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			errors.push(Translator.translate("That email is not registered"));
			res.render("settings", { errors, email: req.body.email, password: req.body.password, password2: req.body.password2 });
		} else {
			bcrypt.genSalt(10, (err, salt) => bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) throw err;
				user.password = hash;
				user.save()
				emailSend(user.email, "Your password was just changed", `<b>${Translator.translate("Please click this")} <a href="${Config.Domain}/settings">${Translator.translate("link")}</a> ${Translator.translate("if you weren't the one who changed your password")}</b>`);
				req.flash("success_msg", "Your password was just changed and can log in");
				res.redirect("/auth/login");
			}));
		}
	}
}

function getLogin(req, res) {
    const back = req.prevPath;
	res.render("login", { back: back });
}

function postLogin(req, res, next) {
	passport.authenticate("local", {
		successRedirect: req.query.back,
		failureRedirect: "/auth/login",
		failureFlash: true
	})(req, res, next);
}

function postLogout(req, res, next) {
	req.logout(err => {
		if (err) { return next(err); }
		req.flash("success_msg", Translator.translate("You are logged out"));
		res.redirect("/auth/login");
	});
}

async function deleteAccount(req, res, next) {
	const cars = await Cars.find();
	cars.filter(car => car.email === req.user.email).forEach(car => {
		Cars.deleteOne({ bid: car.bid }, (err) => {
			if (err) { return next(err); }
	    });
    });

    User.deleteOne({ email: req.user.email }, (err) => {
        if (err) { return next(err); }
        req.flash("success_msg", Translator.translate("Your account was deleted"));
        res.redirect("/auth/register");
    });
}

module.exports = {getRegister,postRegister,getVerified,getPassword,postPassword,getLogin,postLogin,postLogout,deleteAccount};