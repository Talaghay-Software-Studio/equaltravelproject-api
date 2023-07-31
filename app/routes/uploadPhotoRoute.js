const express = require('express');
const router = express.Router();
const uploadPhotoController = require('../controllers/uploadPhotoController');

// Routes
router.post("/property", uploadPhotoController.uploadPropertyPhotos);

module.exports = router;
