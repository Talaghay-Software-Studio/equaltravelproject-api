const dbConn = require("../config/db.config"); // Assuming you have set up your database connection in a separate file.

const PropertyModel = {};

PropertyModel.addPropertyPhotos = (propertyId, photoDirectories) => {
  return new Promise((resolve, reject) => {
    const insertQueries = photoDirectories.map((directory) => {
      return [propertyId, directory];
    });

    const query = "INSERT INTO property_photos (property_id, directory) VALUES ?";
    dbConn.query(query, [insertQueries], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

PropertyModel.getAllPropertyPhotos = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM property_photos";
    dbConn.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

PropertyModel.getPhotosByPropertyId = (propertyId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM property_photos WHERE property_id = ?";
    dbConn.query(query, [propertyId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

PropertyModel.deletePhotoById = (photoId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM property_photos WHERE id = ?";
    dbConn.query(query, [photoId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = PropertyModel;
