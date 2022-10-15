import express from "express";
import { getRegister, postRegister, getVerified, getPassword, postPassword, getLogin, postLogin, postLogout, deleteAccount } from "../controllers/auth.js";
import { ensureAuthenticated, ensureNotAuthenticated } from "../config/api.js";
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

export default router;