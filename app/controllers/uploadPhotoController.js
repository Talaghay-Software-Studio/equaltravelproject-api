const multer = require("multer");
const path = require("path");
const PropertyModel = require("../models/uploadPhoto");

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './property_images/');
    },
    filename: function(req, file, cb) {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, "");
      const fileName = `${timestamp}_${file.originalname}`;
      cb(null, fileName);
    }
  }),
  fileFilter: function(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .jpg and .png files are allowed!'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 2MB limit for each file
  }
}).array('photos', 10); // 'photos' is the key name used for uploading photos

exports.uploadPropertyPhotos = (req, res) => {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    // Check if required fields are empty
    const requiredFields = ['property_id'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length) {
      return res.status(400).send(`The following fields are missing: ${missingFields.join(', ')}`);
    }

    const propertyId = req.body.property_id;
    const photos = req.files;

    if (!photos || photos.length === 0) {
      return res.status(400).send("No photos were uploaded.");
    }

    try {
      const photoDirectories = [];
      for (const photo of photos) {
        const photoDirectory = `property_images/${photo.filename}`;
        photoDirectories.push(photoDirectory);
      }

      // Insert the photo directories into the database for the given property_id
      await PropertyModel.addPropertyPhotos(propertyId, photoDirectories);

      return res.status(200).json({ message: "Property photos uploaded successfully." });
    } catch (error) {
      console.error("Error uploading property photos: ", error);
      return res.status(500).json({ message: "Failed to upload property photos.", error: error });
    }
  });
};
