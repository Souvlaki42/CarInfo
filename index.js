// IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const crypto = require("crypto");
const app = express();

//CONSTANTS
const { Translator, minutesToMiliseconds } = require("./config/api");
const SESSION_SETTINGS = { secret: crypto.randomBytes(64).toString("hex"), resave: true, saveUninitialized: true, rolling: true, cookie: { maxAge: minutesToMiliseconds(10) } };
const DB_SETTINGS = { useNewUrlParser: true, useUnifiedTopology: true };
const { passportSetup } = require("./config/passport");
const PASSPORT_SETTINGS = { cookie: { secure: true } };
const { DB_URI } = require("./config/main.json");

// CONFIGURATION
app.use(express.urlencoded({ extended: false }));
app.use(session(SESSION_SETTINGS));
app.use(passport.session(PASSPORT_SETTINGS));
mongoose.connect(DB_URI, DB_SETTINGS);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(passport.initialize());
app.set("view engine", "ejs");
app.set("layout todo", false);
app.use(expressLayouts);
passportSetup(passport);
app.use(flash());

// MIDDLEWARE
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.Translator = Translator.translate;
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
    if (language[0].includes("gr") || language[0].includes("el")) { Translator.setLocale("gr") };
    next();
});

// ROUTES
app.use("/", require("./routes/main"));
app.use("/todo", require("./routes/todos"));

// MAIN
app.listen(5000);