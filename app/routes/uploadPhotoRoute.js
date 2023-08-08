const express = require('express');
const router = express.Router();
const uploadPhotoController = require('../controllers/uploadPhotoController');

// Routes
router.post("/property", uploadPhotoController.uploadPropertyPhotos);
router.get("/allphotos", uploadPhotoController.getAllPropertyPhotos);
router.get("/photos", uploadPhotoController.getPhotoByPropertyId);
router.delete("/photos/delete", uploadPhotoController.deletePhotoById);

module.exports = router;
