const Localize = require("localize");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const Translator = new Localize("./config");
const From = `Souvlaki42 ${process.env.EMAIL}`;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash("error_msg", Translator.translate("Please log in to access this page"));
    res.redirect("/login");
}

function ensureNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) return next();
    req.flash("error_msg", Translator.translate("Please log out to access this page"));
    res.redirect("/");
}

function emailSend(headers, receiver, subject, message, success_msg, redirect_link) {    
    const Transporter = nodemailer.createTransport({host: "smtp.gmail.com", port: 465, secure: true, auth: {user: process.env.EMAIL, pass: process.env.PASSWORD}});
    let emailOptions = {from: From, to: receiver, subject: Translator.translate(subject), html: message};

    Transporter.sendMail(emailOptions, (error, info) => {
        if (error) return console.log(error);
        headers[0].flash("success_msg", Translator.translate(success_msg));
        headers[1].redirect(redirect_link);
    });
};

function comparePassword(password, password2) {
    bcrypt.compare(password, password2, (err, isMatch) => {
        if(err) console.log(err);
        return isMatch;
    });
};

module.exports = {Translator, ensureAuthenticated, ensureNotAuthenticated, emailSend, comparePassword};