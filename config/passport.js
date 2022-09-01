const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User"); 
const {Translator} = require("./utils");

function testUser(user) {
	if(!user){
		return done(null, false, {message: Translator.translate("That email is not registered")});
	}

	if(user.verified == false){
		return done(null, false, {message: Translator.translate("That email is not verified")});
	}
};

function comparePasswords(inputPassword, userPassword, done, user ) {
	bcrypt.compare(inputPassword, userPassword, (err, isMatch) => {
		if(err) throw err;
		if(isMatch){
			return done(null, user);
		}else{
			return done(null, false, {message: Translator.translate("Password incorrect")});
		}
	});
};

function checkUser(email, password, done) {
	User.findOne({email: email}).then(user => {
		testUser(user);
		comparePasswords(password, user.password, done, user);
	}).catch(err => console.log(err));
};

function passportSetup(passport) {
	passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
		checkUser(email, password, done);
	}));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	
	  passport.deserializeUser((id, done) => {
		User.findById(id,(err, user) => {done(err, user);});
	});
};

module.exports = {passportSetup};