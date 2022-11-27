{/* IMPORTS */}
import express from "express";
import { connect as dbConnect } from "mongoose";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";

{/* CONSTANTS */}
import jsonMain from "./config/main.json" assert {type: "json"};
import { Translator, generateCrypto } from "./config/api.js";
import passportConfig from "./config/passport.js";
const SESSION_SETTINGS = { secret: generateCrypto(64), resave: true, saveUninitialized: true, rolling: true, cookie: {maxAge: 600000} };
const PASSPORT_SETTINGS = { cookie: { secure: true } };
const app = express();

{/* CONFIGURATION */}
app.use(express.urlencoded({ extended: false }));
app.use(session(SESSION_SETTINGS));
app.use(passport.session(PASSPORT_SETTINGS));
dbConnect(jsonMain.DB_URI, console.log("Database Connected!"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
passportConfig(passport);
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(flash());

{/* MIDDLEWARE */}
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.Translator = Translator.translate;
    if (req.user) res.locals.user = req.user;
    res.locals.jsonMain = jsonMain;
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
    const language = req.acceptsLanguages()[0];
    if (language.includes("gr") || language.includes("el")) { Translator.setLocale("gr") };
    next();
});

{/* ROUTES */}
import mainRoute from "./routes/main.js";
import carsRoute from "./routes/cars.js";
import authRoute from "./routes/auth.js";
import tasksRoute from "./routes/tasks.js";

app.use("/", mainRoute);
app.use("/cars", carsRoute);
app.use("/auth", authRoute);
app.use("/tasks", tasksRoute);

{/* LISTENER */}
app.listen(jsonMain.PORT, console.log(`Server Connected! http://localhost:${jsonMain.PORT}`));