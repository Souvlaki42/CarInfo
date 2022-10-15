import express from "express";
const router = express.Router();

import { ensureAuthenticated } from "../config/api.js";

import { getNew, postNew, deleteCar } from "../controllers/cars.js";

router.get("/new", ensureAuthenticated, getNew);

router.post("/new", postNew);

router.delete("/:id", ensureAuthenticated, deleteCar);

export default router;