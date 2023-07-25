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


// Property Address 

PropertyModel.createPropertyAddress = (propertyAddressData, callback) => {
  dbConn.query("INSERT INTO property_address SET ?", propertyAddressData, (error, result) => {
    if (error) {
      console.error("Error creating property address: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getAllPropertyAddress = (callback) => {
  dbConn.query("SELECT * FROM property_address", (error, result) => {
    if (error) {
      console.error("Error retrieving all property addresses: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getPropertyAddressById = (id, callback) => {
  dbConn.query(
    "SELECT * FROM property_address WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error retrieving property address by id: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

PropertyModel.getPropertyAddressByPropertyId = (id, callback) => {
  dbConn.query(
    "SELECT * FROM property_address WHERE property_id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error retrieving property address by id: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

PropertyModel.updatePropertyAddressById = (addressId, propertyAddressData, callback) => {
  dbConn.query(
    "UPDATE property_address SET ? WHERE id = ?",
    [propertyAddressData, addressId],
    (error, result) => {
      if (error) {
        console.error("Error updating property address by id: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

// Property Amenities

PropertyModel.createAmenities = (amenitiesData, callback) => {
  dbConn.query("INSERT INTO property_amenities SET ?", amenitiesData, (error, result) => {
    if (error) {
      console.error("Error creating property amenities: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getAllAmenities = (callback) => {
  dbConn.query("SELECT * FROM property_amenities", (error, result) => {
    if (error) {
      console.error("Error retrieving property amenities: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getAmenitiesById = (amenitiesId, callback) => {
  dbConn.query(
    "SELECT * FROM property_amenities WHERE id = ?",
    [amenitiesId],
    (error, result) => {
      if (error) {
        console.error("Error retrieving property amenities by ID: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

PropertyModel.getAmenitiesByPropertyId = (propertyId, callback) => {
  dbConn.query(
    "SELECT * FROM property_amenities WHERE property_id = ?",
    [propertyId],
    (error, result) => {
      if (error) {
        console.error("Error retrieving property amenities by ID: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

PropertyModel.updateAmenitiesById = (amenityId, amenityData, callback) => {
  dbConn.query(
    "UPDATE property_amenities SET ? WHERE id = ?",
    [amenityData, amenityId],
    (error, result) => {
      if (error) {
        console.error("Error updating property amenities by ID: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};


module.exports = PropertyModel;
