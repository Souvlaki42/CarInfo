const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const {passportSetup} = require("./config/passport");
const {Translator} = require("./config/utils");
const Config = require("./config/config.json");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const crypto = require("crypto");
const app = express();

passportSetup(passport);

mongoose.connect(Config.Database, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(session({secret: crypto.randomBytes(64).toString("hex"), resave: true, saveUninitialized: true, rolling: true, cookie: {maxAge: Config.ConnectionTimeout}}));
app.use(passport.initialize());
app.use(passport.session({cookie: {secure: true}}));
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
    const language = req.acceptsLanguages();
    if (language[0].includes("gr") || language[0].includes("el")){Translator.setLocale("gr")};
    next();
});

app.use("/", require("./config/routes"));

app.listen(Config.Port);