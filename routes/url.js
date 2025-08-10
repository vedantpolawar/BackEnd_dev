const express = require("express");
const router = express.Router();
const {
  generateNewShortURL,
  handleGetAnalytics,
  handleGetUrl,
} = require("../controllers/url");
router.post("/", generateNewShortURL);
router.get("/:shortId", handleGetUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
module.exports = router;
