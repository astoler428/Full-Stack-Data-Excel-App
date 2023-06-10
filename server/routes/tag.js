const express = require("express");
const router = express.Router();

const {
  getAllTags,
  updateTag,
  updateRecentTag,
  getRecentTag,
} = require("../controllers/tagController");

router.get("/", getAllTags);
router.put("/update", updateTag);
router.put("/recent", updateRecentTag);
router.get("/recent", getRecentTag);

module.exports = router;
