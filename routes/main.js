const express = require("express");
const { ensureAuthenticated } = require("../config/api");

const {getIndex, postIndex} = require("../controllers/main");

const router = express.Router();

router.get("/", ensureAuthenticated, getIndex);

router.post("/", ensureAuthenticated, postIndex);

module.exports = router;