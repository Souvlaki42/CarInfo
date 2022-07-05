const Localize = require("localize");
const nodemailer = require("nodemailer");
const Translator = new Localize("./config");

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) return next();
    req.flash("error_msg", Translator.translate("Please log in to access this page"));
    res.redirect("/login");
}

function ensureNotAuthenticated(req, res, next){
    if (!req.isAuthenticated()) return next();
    req.flash("error_msg", Translator.translate("Please log out to access this page"));
    res.redirect("/");
}

function isInt(value){
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function sendAnEmail(req, res, reciever, subject, htmlItems, success_msg, redirect) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {user: process.env.EMAIL, pass: process.env.PASSWORD}
    });

    let mailOptions = {
        from: `${process.env.ADMIN} ${process.env.EMAIL}`,
        to: reciever,
        subject: Translator.translate(subject),
        html: htmlItems,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        req.flash("success_msg", Translator.translate(success_msg));
        res.redirect(redirect);
    });
};

module.exports = {Translator, ensureAuthenticated, ensureNotAuthenticated, isInt, sendAnEmail};