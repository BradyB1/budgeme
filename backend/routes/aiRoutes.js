const express = require("express");
const { getFinancialTip } = require("../controllers/aiController");

const router = express.Router();

router.get("/financial-tips/:userId", getFinancialTip);

module.exports = router;
