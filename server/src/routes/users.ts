import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/reset-password", UserController.passwordReset)

router.post("/logout", UserController.logout);

router.post("/sendOTP", UserController.sendOTP);

router.post("/verifyOTP", UserController.verifyOTP);

export default router;
