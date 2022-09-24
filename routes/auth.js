const express = require("express");
const {getRegister, postRegister, getVerified, getPassword, postPassword, getLogin, postLogin, postLogout, deleteAccount} = require("../controllers/auth");
const { ensureAuthenticated, ensureNotAuthenticated } = require("../config/api");
const router = express.Router();

router.get("/register", ensureNotAuthenticated, getRegister);

router.post("/register", postRegister);

router.get("/verify/:token", ensureNotAuthenticated, getVerified);

router.get("/password", ensureNotAuthenticated, getPassword);

router.post("/password", postPassword);

router.get("/login", ensureNotAuthenticated, getLogin);

router.post("/login", postLogin);

router.post("/logout", ensureAuthenticated, postLogout);

router.delete("/account", ensureAuthenticated, deleteAccount);

module.exports = router;