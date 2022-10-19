import Localize from "localize";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonMain from "./main.json" assert {type: "json"};
export const Translator = new Localize("./config");
const Transporter = nodemailer.createTransport({host: "smtp.gmail.com", port: 465, secure: true, auth: {user: jsonMain.MAIL_USER, pass: jsonMain.MAIL_KEY}});

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

export function emailSend(receiver, subject, message) {
    const emailOptions = {from: `CarInfo ${jsonMain.MAIL_USER}`, to: receiver, subject: Translator.translate(subject), text: message, html: message};
    Transporter.sendMail(emailOptions, error => {if (error) console.log(error)});
};

export function generateCrypto(key) {
    return crypto.randomBytes(key).toString("hex");
};