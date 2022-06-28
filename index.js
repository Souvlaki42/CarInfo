const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const crypto = require("crypto");
const smws = require("smws");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");
const app = express();

require("dotenv").config({path: "./config/.env"});
require("./config/passport")(passport);

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("Database Connected!")).catch(err => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({secret: crypto.randomBytes(64).toString("hex"), resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
   res.locals.success_msg = req.flash("success_msg");
   res.locals.error_msg = req.flash("error_msg");
   res.locals.error = req.flash("error");
   next();
});

app.use((req, res, next) => {
	if (req.query._method){
		req.method = req.query._method;
		req.url = req.path;
	} 
    next();
});

app.use("/", require("./config/routes"));

app.listen(process.env.PORT, console.log(`Server Started - ${process.env.PORT}!`));