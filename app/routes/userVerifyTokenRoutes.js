const express = require('express');
const router = express.Router();
const userVerifyTokenController = require('../controllers/userVerifyTokenController');

// Routes
router.post("/", userVerifyTokenController.checkToken);

module.exports = router;