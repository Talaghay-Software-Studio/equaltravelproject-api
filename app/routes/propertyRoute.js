const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Property Basic Info
router.post("/", propertyController.createProperty);
router.get("/", propertyController.getAllProperty);
router.get("/search", propertyController.getPropertyById);
router.put("/update", propertyController.updatePropertyById);



module.exports = router;