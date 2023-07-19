const dbConn = require("../config/db.config");
const fs = require('fs');
const path = require('path');
const mimeTypes = require('mime-types');

const PropertyModel = {};

PropertyModel.createProperty = (propertyData, callback) => {
  dbConn.query("INSERT INTO property SET ?", propertyData, (error, result) => {
    if (error) {
      console.error("Error creating property: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.uploadPhoto = (filePath, propertyId, userDetails, callback) => {
  // Get current date
  const currentDate = new Date().toISOString().replace(/[-T:.Z]/g, "").replace(/(\d{2})(\d{2})(\d{2})(\d+)/, "$1-$2-$3-$4");

  // Generate file name
  const fileName = `${currentDate}_${userDetails.first_name}_${userDetails.last_name}_${userDetails.id}.jpeg`;

  // Set file path
  const destinationPath = path.join(__dirname, '../../property_images');
  const newFilePath = path.join(destinationPath, fileName);

  console.log("File Path:", filePath);
  console.log("Destination Path:", newFilePath);

  // Determine the MIME type using the file extension
  const mimeType = mimeTypes.lookup(filePath);

  console.log("MIME Type:", mimeType);

  // Check if the file is a JPEG or PNG
  const validMimeTypes = ['image/jpeg', 'image/png'];
  if (!validMimeTypes.includes(mimeType)) {
    return callback("Invalid file format. Only JPEG and PNG files are allowed.", null);
  }

  // Move the uploaded file to the property_image folder
  fs.rename(filePath, newFilePath, (error) => {
    if (error) {
      console.error("Error moving photo:", error);
      return callback("Error moving photo", null);
    }

    console.log("Photo moved successfully");

    // Save the photo directory to the database
    const photoDirectory = `../property_image/${fileName}`;

    dbConn.query(
      'UPDATE property SET photos_directory = ? WHERE id = ?',
      [photoDirectory, propertyId],
      (error, result) => {
        if (error) {
          console.error("Error updating photo directory in the database:", error);
          return callback("Error updating photo directory in the database", null);
        }

        console.log("Photo directory updated in the database");

        return callback(null, photoDirectory);
      }
    );
  });
};

module.exports = PropertyModel;
