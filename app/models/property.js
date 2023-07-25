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


// Property Category

PropertyModel.createCategory = (categoryData, callback) => {
  dbConn.query("INSERT INTO property_category SET ?", categoryData, (error, result) => {
    if (error) {
      console.error("Error creating property category: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getAllCategory = (callback) => {
  dbConn.query("SELECT * FROM property_category", (error, result) => {
    if (error) {
      console.error("Error retrieving all property categories: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getCategoryById = (categoryId, callback) => {
  dbConn.query("SELECT * FROM property_category WHERE id = ?", [categoryId], (error, result) => {
    if (error) {
      console.error("Error retrieving property category by id: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getCategoryByPropertyId = (propertyId, callback) => {
  dbConn.query("SELECT * FROM property_category WHERE property_id = ?", [propertyId], (error, result) => {
    if (error) {
      console.error("Error retrieving property category by id: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.updateCategoryById = (categoryId, categoryData, callback) => {
  dbConn.query("UPDATE property_category SET ? WHERE id = ?", [categoryData, categoryId], (error, result) => {
    if (error) {
      console.error("Error updating property category: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};


// Property Facilities

PropertyModel.createFacility = (facilityData, callback) => {
  dbConn.query("INSERT INTO property_facilities SET ?", facilityData, (error, result) => {
    if (error) {
      console.error("Error creating property facility: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getAllFacilities = (callback) => {
  dbConn.query("SELECT * FROM property_facilities", (error, result) => {
    if (error) {
      console.error("Error retrieving all property facilities: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getFacilityById = (facilityId, callback) => {
  dbConn.query(
    "SELECT * FROM property_facilities WHERE id = ?",
    [facilityId],
    (error, result) => {
      if (error) {
        console.error("Error retrieving property facility by id: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

PropertyModel.getFacilityByPropertyId = (propertyId, callback) => {
  dbConn.query("SELECT * FROM property_facilities WHERE property_id = ?", [propertyId], (error, result) => {
    if (error) {
      console.error("Error retrieving property category by id: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.updateFacilityById = (facilityData, callback) => {
  const { facility_id, property_id, name, quantity } = facilityData;

  dbConn.query(
    "UPDATE property_facilities SET property_id = ?, name = ?, quantity = ? WHERE id = ?",
    [property_id, name, quantity, facility_id],
    (error, result) => {
      if (error) {
        console.error("Error updating property facility by id: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};


// Property Safety Items


PropertyModel.createSafetyItems = (safetyData, callback) => {
  const { property_id, name, quantity } = safetyData;

  dbConn.query(
    "INSERT INTO property_safety_items (property_id, name, quantity) VALUES (?, ?, ?)",
    [property_id, name, quantity],
    (error, result) => {
      if (error) {
        console.error("Error creating property safety items: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

PropertyModel.getAllSafetyItems = (callback) => {
  dbConn.query("SELECT * FROM property_safety_items", (error, result) => {
    if (error) {
      console.error("Error retrieving property safety items: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.getSafetyItemsById = (id, callback) => {
  dbConn.query(
    "SELECT * FROM property_safety_items WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error retrieving property safety items by ID: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

PropertyModel.getSafetyItemsByPropertyId = (propertyId, callback) => {
  dbConn.query("SELECT * FROM property_safety_items WHERE property_id = ?", [propertyId], (error, result) => {
    if (error) {
      console.error("Error retrieving property safety items by id: ", error);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

PropertyModel.updateSafetyItemsById = (safetyItemId, updatedData, callback) => {
  dbConn.query(
    "UPDATE property_safety_items SET ? WHERE id = ?",
    [updatedData, safetyItemId],
    (error, result) => {
      if (error) {
        console.error("Error updating property safety items by ID: ", error);
        return callback(error, null);
      }

      return callback(null, result.affectedRows);
    }
  );
};

module.exports = PropertyModel;
