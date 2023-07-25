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

// Property Amenities
router.post("/amenities", propertyController.createAmenities);
router.get("/amenities", propertyController.getAllAmenities);
router.get("/amenities/search", propertyController.getAmenitiesById);
router.get("/amenities/search2", propertyController.getAmenitiesByPropertyId);
router.put("/amenities/update", propertyController.updateAmenitiesById);

// Property Category
router.post("/category", propertyController.createCategory);
router.get("/category", propertyController.getAllCategory);
router.get("/category/search", propertyController.getCategoryById);
router.get("/category/search2", propertyController.getCategoryByPropertyId);
router.put("/category/update", propertyController.updateCategoryById);



module.exports = router;