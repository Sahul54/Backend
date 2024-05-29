const express = require("express");
const router = express.Router();

// controller Import
const {dummy} = require("../controllers/likeController");

// Mapping Create
router.get("/dummy", dummy);

// Export
module.exports = router;