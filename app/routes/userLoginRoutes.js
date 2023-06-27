const express = require('express');
const router = express.Router();
const userLoginController = require('../controllers/userLoginController');

// Routes
router.post("/", userLoginController.checkEmail);
router.post("/email", userLoginController.checkEmailDB);

module.exports = router;