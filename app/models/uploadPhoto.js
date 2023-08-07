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

module.exports = PropertyModel;
