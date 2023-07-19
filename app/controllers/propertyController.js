const multer = require('multer');
const path = require('path');
const PropertyModel = require('../models/property');
const mimeTypes = require('mime-types');

const storage = multer.diskStorage({
  destination: './property_images',
  filename: (req, file, callback) => {
    const userDetails = req.user.user_details;
    const currentDate = new Date().toISOString().replace(/[-T:.Z]/g, "").replace(/(\d{2})(\d{2})(\d{2})(\d+)/, "$1-$2-$3-$4");
    const fileName = `${currentDate}_${userDetails.first_name}_${userDetails.last_name}_${userDetails.id}${path.extname(file.originalname)}`;
    callback(null, fileName);
  }
});

const upload = multer({ storage: storage });

const propertyController = {};

propertyController.createProperty = (req, res) => {
  const {
    status,
    price,
    description,
    title,
    safety_items,
    facilities_id,
    amenities,
    address,
    type,
    category
  } = req.body;

  // Get user ID from the token's payload
  const userId = req.user.id;

  const propertyData = {
    user_id: userId,
    status,
    price,
    description,
    title,
    safety_items,
    facilities_id,
    amenities,
    address,
    type,
    category
  };

  PropertyModel.createProperty(propertyData, (error, result) => {
    if (error) {
      console.error("Error creating property: ", error);
      return res.status(500).send("Error creating property");
    }

    return res.status(200).json({
      message: "Property created successfully",
      propertyId: result.insertId
    });
  });
};

propertyController.uploadPhotos = (req, res) => {
  // Check if the request contains a photo file
  if (!req.file) {
    return res.status(400).send("No photo provided.");
  }

  // Get the file path and other necessary data
  const photoDirectory = req.file.path;
  const propertyId = req.body.propertyId || req.params.id; // Assuming propertyId is provided in req.body or req.params
  const userDetails = req.user.user_details; // Assuming userDetails is available in req.user.user_details

  // Update the photos_directory field in the database
  PropertyModel.uploadPhoto(photoDirectory, propertyId, userDetails, (error, result) => {
    if (error) {
      console.error("Error updating photo directory:", error);
      return res.status(500).send("Error updating photo directory");
    }

    return res.status(200).json({
      message: "Photo uploaded successfully",
      photoDirectory: result // Using the result from the callback
    });
  });
};

module.exports = {
  upload: upload,
  propertyController: propertyController
};
