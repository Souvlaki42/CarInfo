import  Localize from "localize";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonMain from "./main.json" assert {type: "json"};
export const Translator = new Localize("./config");
const Transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: jsonMain.MAIL_USER, pass: jsonMain.MAIL_PASS } });
const From = `Souvlaki42 ${jsonMain.MAIL_USER}`;

export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash("error_msg", Translator.translate("Please log in to access this page"));
    res.redirect("/auth/login");
};

export function ensureNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) return next();
    req.flash("error_msg", Translator.translate("Please log out to access this page"));
    res.redirect("/");
};

export function emailSend(receiver, subject, message, returnInfo = false) {
    let emailOptions = { from: From, to: receiver, subject: Translator.translate(subject), html: message };

    Transporter.sendMail(emailOptions, (error, info) => {
        if (error) return console.log(error);
        if (returnInfo) return console.log(info);
    });
};

export function generateCrypto(key) {
    return crypto.randomBytes(key).toString("hex");
};