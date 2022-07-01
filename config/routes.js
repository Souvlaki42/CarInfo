const express = require("express");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Cars = require("../models/newCar");
const User = require("../models/userAuth");
const Translator = require("../config/localize");

const router = express.Router();
const {ensureAuthenticated, ensureNotAuthenticated} = require("./auth");

router.get("/", ensureAuthenticated, async (req, res) => {
	const cars = await Cars.find().sort({ createdAt: "desc" });
    res.render("index", {cars: cars, user: req.user, Translator: Translator});
});

router.get("/register", ensureNotAuthenticated, (req, res) => {
	res.render("register", {Translator: Translator});
});

router.post("/register", (req, res) => {
	const { username, email, password, password2 } = req.body;
	let errors = [];

	if (!username || !email || !password || !password2){
		errors.push({msg: Translator.translate("Please fill in all fields")});
	};

	if (password !== password2){
		errors.push({msg: Translator.translate("Passwords do not match")});
	};

	if (password.length < 8){
		errors.push({msg: Translator.translate("Password should be at least 8 characters")});
	};

	if (errors.length > 0){
		res.render("register", {errors, username, email, password, password2, Translator: Translator});
	}else{
		User.findOne({email: email}).then(user => {
			if (user) {
				errors.push({msg: Translator.translate("Email is already registered")});
				res.render("register", {errors, username, email, password, password2, Translator: Translator}); 
			}else{
				const newUser = new User({username, email, password, token: crypto.randomBytes(64).toString("hex")});
				bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save().then(user => {
						req.flash("success_msg", Translator.translate("You are registered and can log in"));
						res.redirect("/login");
					}).catch(err => console.log(err));
				}));
			};
		});
	};
});

router.get("/login", ensureNotAuthenticated, (req, res) => {
	res.render("login", {Translator: Translator});
}); 

router.post("/login", (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})(req, res, next);
});

router.get("/verify", (req, res) => {
    res.render("verify", {Τranslator: Translator});
});

router.post("/verify", (req, res) => {
    const { email } = req.body;
    let errors = [];

    if (!email){
        errors.push({msg: "Please fill your email"});
    }

    if (errors.length > 0){
        res.render("verify", {errors, email, Τranslator: Translator});
    } else{
        User.findOne({email: email}).then(user => {
            if (!user){
                errors.push({msg: "Email is not registered"});
                res.render("verify", {errors, email, Τranslator: Translator});
            } else {
                link = process.env.DOMAIN + "/" + user.token;
                console.log("Link: " + link);
            }
        });
    }
});

router.get("/change-password", (req,res) => {
    res.render("password", {Τranslator: Translator});
});

router.post("/change-password", (req, res) => {
	const { email, password, password2 } = req.body;
	let errors = [];

	if (!email || !password || !password2){
		errors.push({msg: Translator.translate("Please fill in all fields")});
	};

	if (password !== password2){
		errors.push({msg: Translator.translate("Passwords do not match")});
	};

	if (password.length < 8){
		errors.push({msg: Translator.translate("Password should be at least 8 characters")});
	};

	if (errors.length > 0){
		res.render("password", {errors, email, password, password2, Τranslator: Translator});
	}else{
		User.findOne({email: email}).then(user => {
			if (!user) {
				errors.push({msg: "Email is not registered"});
				res.render("password", {errors, email, password, password2, Τranslator: Translator}); 
			}else{
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					user.password = hash;
					user.save().then(user => {
						req.flash("success_msg","Your password changed and can log in");
						res.redirect("/login");
					}).catch(err => console.log(err));
				}));
			};
		});
	};
});

router.get("/logout", ensureAuthenticated, function(req, res, next) {
	req.logout(function(err) {
		if (err) {return next(err);}
		req.flash("success_msg", Translator.translate("You are logged out"));
	  	res.redirect("/login");
	});
});

router.get("/new", ensureAuthenticated, (req, res) => {
    res.render("new", {Τranslator: Translator});
});

router.post("/new", async (req, res) => {
    const {engine_number, frame, license_plate, date, price} = req.body;
    let errors = [];

    if (!engine_number || !frame || !license_plate || !date){
        errors.push({msg: Translator.translate("Please fill in all fields")});
    }

    if (errors.length > 0){
		res.render("new", {errors, engine_number, frame, license_plate, date, price, Τranslator: Translator});
	} else{
        let car = new Cars({
            engineNumber: engine_number,
            frame: frame,
            licensePlate: license_plate,
            date: date,
            price: price || "",
            user: req.user.email
        });

        car = await car.save();
        res.redirect("/");
    }   
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
		req.flash("success_msg", Translator.translate("Your account was deleted"));
		res.redirect("/register");
	});
});

router.post("/", ensureAuthenticated , async (req, res) => {
	let search = req.body.query;
    let select = req.body.selector;
    let errors = [];

    if (!search){
        errors.push({msg: Translator.translate("Please fill the searchbox")});
    }

    if (select == 0){
        errors.push({msg: Translator.translate("Please select a type to search")});
    }

    if (errors.length > 0){
        cars = await Cars.find().sort({ createdAt: "desc" });
        res.render("index", {cars: cars, user: req.user, search: req.body.query, errors: errors, Τranslator: Translator});
	} else {
        if (select == "1"){
            cars = await (await Cars.find().sort({createdAt: "desc"})).filter(car => car.engineNumber.includes(search));
        }
        if (select == "2"){
            cars = await (await Cars.find().sort({createdAt: "desc"})).filter(car => car.frame.includes(search));
        }
        if (select == "3"){
            cars = await (await Cars.find().sort({createdAt: "desc"})).filter(car => car.licensePlate.includes(search));
        }
        if (select == "4"){
            cars = await (await Cars.find().sort({createdAt: "desc"})).filter(car => car.date.includes(search));
        }
        
        res.render("index", {cars: cars, user: req.user, search: req.body.query, show_all: process.env.SHOW_ALL, Τranslator: Translator});
    }
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