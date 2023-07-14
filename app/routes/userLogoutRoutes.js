const express = require('express');
const router = express.Router();
const userLogoutController = require('../controllers/userLogoutController');

// Routes
router.post("/", userLogoutController.deleteToken);

module.exports = router;