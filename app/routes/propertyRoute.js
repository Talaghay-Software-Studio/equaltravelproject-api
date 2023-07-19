const express = require('express');
const router = express.Router();
const { upload, propertyController } = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post("/", authMiddleware, propertyController.createProperty);
router.put("/photo", authMiddleware, upload.single('photo'), propertyController.uploadPhotos);
// router.get("/", propertyController.getProperty);
// router.get("/search", propertyController.getPropertyById);
// router.put("/update", propertyController.updatePropertyById);
// router.delete("/delete", propertyController.deletePropertyById);

module.exports = router;