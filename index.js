const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const {Translator} = require("./config/utils");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const crypto = require("crypto");
const app = express();

require("dotenv").config({path: "./config/.env"});
require("./config/passport")(passport);

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("Database Connected!")).catch(err => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({secret: crypto.randomBytes(64).toString("hex"), resave: true, saveUninitialized: true, rolling: true, cookie: {maxAge: 60000}}));
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
	if (req.query._method) {
		req.method = req.query._method;
		req.url = req.path;
    } 
    next();
});

app.use((req, res, next) => {
    Translator.setLocale("en");
    const language = req.headers["accept-language"];
    if (language.includes("gr") || language.includes("el")){Translator.setLocale("gr")};
    next();
});

app.use("/", require("./config/routes"));

app.listen(process.env.PORT, console.log(`Server Started - ${process.env.PORT}!`));