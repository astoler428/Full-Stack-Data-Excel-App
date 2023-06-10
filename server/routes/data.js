const express = require("express");
const router = express.Router();

const { addData, getRandomData } = require("../controllers/dataController.js");

// /data route

router.post("/add", addData);
router.get("/random", getRandomData);

module.exports = router;
