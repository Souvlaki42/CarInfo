const express = require("express");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const router = express.Router();
const {ensureAuthenticated, ensureNotAuthenticated} = require("./auth");
const User = require("../models/userAuth");
const Cars = require("../models/newCar");

router.get("/", ensureAuthenticated, async (req, res) => {
	const cars = await Cars.find().sort({ createdAt: "desc" });
	res.render("index", {cars: cars, user: req.user});
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

	if (password.length < 8){
		errors.push({msg: "Password should be at least 8 characters"});
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
	const cars = await Cars.find();
	cars.filter(car => car.email === req.user.email).forEach(car => {
		Cars.deleteOne({bid: car.bid}, function(err) {
			if (err) {return next(err);}
		});
	});

	User.deleteOne({email: req.user.email}, function(err) {
		if (err) {return next(err);}
		req.flash("success_msg", "Your account was deleted");
		res.redirect("/register");
	});
});

router.post("/search", ensureAuthenticated , async (req, res) => {
	const select = req.body.selector;
    let value = select.options[select.selectedIndex].value;
    console.log(value);
});

router.delete("/:bid", ensureAuthenticated, async function(req, res, next){
    const car = await Cars.findOne({bid: req.params.bid});
    if (car == null) return res.sendStatus(404);

    Cars.deleteOne({bid: req.params.bid}, function(err) {
        if (err) {return next(err);}
        res.redirect("/");
    });
});

module.exports = router;