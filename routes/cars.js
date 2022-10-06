const express = require("express");
const router = express.Router();

const { ensureAuthenticated } = require("../config/api");

const { getNew, postNew, deleteCar } = require("../controllers/cars");

router.get("/new", ensureAuthenticated, getNew);

router.post("/new", postNew);

router.delete("/:id", ensureAuthenticated, deleteCar);

module.exports = router;