const Localize = require("localize");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { MAIL_USER, MAIL_KEY } = require("./main.json");
const Translator = new Localize("./config");
const Transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: MAIL_USER, pass: MAIL_KEY } });
const From = `Souvlaki42 ${MAIL_USER}`;

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

function emailSend(receiver, subject, message, returnInfo = false) {
    let emailOptions = { from: From, to: receiver, subject: Translator.translate(subject), html: message };

    Transporter.sendMail(emailOptions, (error, info) => {
        if (error) return console.log(error);
        if (returnInfo) return console.log(info);
    });
};

function minToMs(min) {
    return min * 60000;
}

function generateCrypto(key) {
    return crypto.randomBytes(key).toString("hex");
}

module.exports = { Translator, ensureAuthenticated, ensureNotAuthenticated, emailSend, minToMs, generateCrypto };