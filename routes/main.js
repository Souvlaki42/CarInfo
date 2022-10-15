import express from "express";
import { ensureAuthenticated } from "../config/api.js";

import { getIndex, postIndex } from "../controllers/main.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getIndex);

router.post("/", ensureAuthenticated, postIndex);

export default router;