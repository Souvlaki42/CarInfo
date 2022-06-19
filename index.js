const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const { generateRandomPhrase } = require("./config/auth");

const app = express();
const port = 80;
const database = "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb";

require("./config/passport")(passport);

mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("Database Connected!")).catch(err => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({secret: generateRandomPhrase(), resave: true, saveUninitialized: true}));
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
	};

	next();
});

app.use("/", require("./config/routes"));

app.listen(port, console.log(`Server Started - ${port}!`));