const express = require("express");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const router = express.Router();
const {ensureAuthenticated, ensureNotAuthenticated} = require("./auth");
const User = require("../models/userAuth");
const ShortUrl = require("../models/shortUrl");

router.get("/", ensureAuthenticated, async (req, res) => {
	const shortUrls = await ShortUrl.find().sort({ createdAt: "desc" });
	res.render("index", {shortUrls: shortUrls, user: req.user});
});

router.get("/register", ensureNotAuthenticated, (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {
	const { username, email, password, password2 } = req.body;
	let errors = [];

	if (!username || !email || !password || !password2){
		errors.push({msg: "Please fill in all fields"});
	};

	if (password !== password2){
		errors.push({msg: "Passwords do not match"});
	};

	if (password.length < 6){
		errors.push({msg: "Password should be at least 6 characters"});
	};

	if (errors.length > 0){
		res.render("register", {errors, username, email, password, password2});
	}else{
		User.findOne({email: email}).then(user => {
			if (user) {
				errors.push({msg: "Email is alraedy registered"});
				res.render("register", {errors, username, email, password, password2}); 
			}else{
				const newUser = new User({username, email, password, token: crypto.randomBytes(64).toString("hex")});
				bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save().then(user => {
						req.flash("success_msg","You are registered and can log in");
						res.redirect("/login");
					}).catch(err => console.log(err));
				}));
			};
		});
	};
});

router.get("/login", ensureNotAuthenticated, (req, res) => {
	res.render("login");
}); 

router.post("/login", (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})(req, res, next);
});

router.get('/logout', ensureAuthenticated, function(req, res, next) {
	req.logout(function(err) {
		if (err) {return next(err);}
		req.flash("success_msg", "You are logged out");
	  	res.redirect('/login');
	});
});

router.delete("/account", ensureAuthenticated, async function(req, res, next){
	const shortUrls = await ShortUrl.find();
	shortUrls.filter(shortUrl => shortUrl.email === req.user.email).forEach(shortUrl => {
		ShortUrl.deleteOne({short: shortUrl.short}, function(err) {
			if (err) {return next(err);}
		});
	});

	User.deleteOne({email: req.user.email}, function(err) {
		if (err) {return next(err);}
		req.flash("success_msg", "Your account was deleted");
		res.redirect("/register");
	});
});

router.post("/shorturls", ensureAuthenticated , async (req, res) => {
	await ShortUrl.create({long: req.body.longUrl, email: req.user.email});
	res.redirect("/");
});

router.delete("/:shortUrl", ensureAuthenticated, async function(req, res, next){
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl});
    if (shortUrl == null) return res.sendStatus(404);

    ShortUrl.deleteOne({short: req.params.shortUrl}, function(err) {
        if (err) {return next(err);}
        res.redirect("/");
    });
});

router.get("/:shortUrl", async (req, res) => {
	const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl});
	if (shortUrl == null) return res.sendStatus(404);

	shortUrl.clicks++;
	shortUrl.save();

	res.redirect(shortUrl.long);
});

module.exports = router;