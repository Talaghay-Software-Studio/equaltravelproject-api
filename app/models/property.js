const dbConn = require("../config/db.config");

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

PropertyModel.getAllProperty = (callback) => {
  dbConn.query("SELECT * FROM property", (error, result) => {
    if (error) {
      console.error("Error retrieving all properties: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getPropertyById = (id, callback) => {
  dbConn.query("SELECT * FROM property WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error retrieving property by ID: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.updatePropertyById = (property_id, propertyData, callback) => {
  dbConn.query("UPDATE property SET ? WHERE id = ?", [propertyData, property_id], (error, result) => {
    if (error) {
      console.error("Error updating property by ID: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

module.exports = PropertyModel;
