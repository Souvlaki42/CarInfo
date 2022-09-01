const Localize = require("localize");
const nodemailer = require("nodemailer");
const { MAIL_USER, MAIL_KEY } = require("./main.json");
const Translator = new Localize("./config");
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

function emailSend(headers, receiver, subject, message, success_msg, redirect_link) {
    const Transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: MAIL_USER, pass: MAIL_KEY } });
    let emailOptions = { from: From, to: receiver, subject: Translator.translate(subject), html: message };

    Transporter.sendMail(emailOptions, (error, info) => {
        if (error) return console.log(error);
        headers[0].flash("success_msg", Translator.translate(success_msg));
        headers[1].redirect(redirect_link);
    });
};

function minutesToMiliseconds(minutes) {
    return minutes * 60000;
}

module.exports = { Translator, ensureAuthenticated, ensureNotAuthenticated, emailSend, minutesToMiliseconds };