const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get("/", userController.getUser);
router.get("/search", userController.getUserById);
router.put("/update", userController.updateUserById);
router.delete("/delete", userController.deleteUserById);

module.exports = router;