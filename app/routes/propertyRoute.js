const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Property Basic Info
router.post("/", propertyController.createProperty);
router.get("/", propertyController.getAllProperty);
router.get("/search", propertyController.getPropertyById);
router.put("/update", propertyController.updatePropertyById);

// Property Address
router.post("/address", propertyController.createPropertyAddress);
router.get("/address", propertyController.getAllPropertyAddress);
router.get("/address/search", propertyController.getPropertyAddressById);
router.get("/address/search2", propertyController.getPropertyAddressByPropertyId);
router.put("/address/update", propertyController.updatePropertyAddressById);

module.exports = router;