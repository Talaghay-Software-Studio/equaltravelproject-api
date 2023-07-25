const express = require('express');
const router = express.Router();
const userVerifyTokenController = require('../controllers/userVerifyTokenController');

// Routes
router.get("/verify", userVerifyTokenController.verifyToken);

module.exports = router;