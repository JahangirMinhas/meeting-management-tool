const express = require("express");
const router = express.Router();
const { getTranscriptions } = require("../controllers/transcribeController");

router.get("/", getTranscriptions);

module.exports = router;