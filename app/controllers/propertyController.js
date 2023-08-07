const PropertyModel = require('../models/property');

const propertyController = {};

propertyController.createProperty = (req, res) => {
  const {
    user_id,
    title,
    status,
    price,
    description,
    facilities,
    safety_items,
    amenities,
    category,
    property_address,
    property_type,
  } = req.body;

  const propertyData = {
    user_id,
    title,
    status,
    price,
    description,
  };

  PropertyModel.createProperty(propertyData, (error, propertyId) => {
    if (error) {
      console.error("Error creating property: ", error);
      return res.status(500).send("Error creating property");
    }

    const propertyIdValue = propertyId.insertId;

    // Insert facilities
    if (Array.isArray(facilities)) {
      PropertyModel.insertFacilities(propertyIdValue, facilities, (error) => {
        if (error) {
          console.error("Error inserting facilities: ", error);
          return res.status(500).send("Error creating property");
        }
      });
    }

    // Insert safety items
    if (Array.isArray(safety_items)) {
      PropertyModel.insertSafetyItems(propertyIdValue, safety_items, (error) => {
        if (error) {
          console.error("Error inserting safety items: ", error);
          return res.status(500).send("Error creating property");
        }
      });
    }

    // Insert amenities
    if (Array.isArray(amenities)) {
      PropertyModel.insertAmenities(propertyIdValue, amenities, (error) => {
        if (error) {
          console.error("Error inserting amenities: ", error);
          return res.status(500).send("Error creating property");
        }
      });
    }

    // Insert category
    if (Array.isArray(category)) {
      PropertyModel.insertCategory(propertyIdValue, category, (error) => {
        if (error) {
          console.error("Error inserting category: ", error);
          return res.status(500).send("Error creating property");
        }
      });
    }

    // Insert property address
    if (Array.isArray(property_address)) {
      PropertyModel.insertPropertyAddress(propertyIdValue, property_address, (error) => {
        if (error) {
          console.error("Error inserting property address: ", error);
          return res.status(500).send("Error creating property");
        }
      });
    }

    // Insert property type
    if (Array.isArray(property_type)) {
      PropertyModel.insertPropertyType(propertyIdValue, property_type, (error) => {
        if (error) {
          console.error("Error inserting property type: ", error);
          return res.status(500).send("Error creating property");
        }
      });
    }

    return res.status(200).json({
      message: "Property created successfully",
      propertyId: propertyIdValue,
    });
  });
};

propertyController.getAllProperty = (req, res) => {
  PropertyModel.getAllProperty((error, properties) => {
    if (error) {
      console.error("Error getting all properties: ", error);
      return res.status(500).json({ message: 'Error getting properties' });
    }

    return res.status(200).json(properties);
  });
};

propertyController.getPropertyById = (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ message: 'Property ID is missing in query parameter' });
  }

  PropertyModel.getPropertyById(id, (error, property) => {
    if (error) {
      console.error("Error getting property by ID: ", error);
      return res.status(500).json({ message: 'Error getting property by ID' });
    }

    if (property.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.status(200).json(property);
  });
};

propertyController.updatePropertyById = (req, res) => {
  const {
    property_id,
    user_id,
    title,
    status,
    price,
    description,
  } = req.body;

  if (!property_id) {
    return res.status(400).json({ message: 'Property ID is missing in request body' });
  }

  const propertyData = {
    user_id,
    title,
    status,
    price,
    description,
  };

  PropertyModel.updatePropertyById(property_id, propertyData, (error, result) => {
    if (error) {
      console.error("Error updating property by ID: ", error);
      return res.status(500).json({ message: 'Error updating property by ID' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.status(200).json({ message: 'Property updated successfully' });
  });
};


// Property Address

propertyController.createPropertyAddress = (req, res) => {
  const {
    property_id,
    street,
    city,
    state,
    zip_code,
    longitude,
    latitude,
  } = req.body;

  if (!property_id || !street || !city || !state || !zip_code) {
    return res.status(400).json({ message: 'Missing required fields in request body' });
  }

  const propertyAddressData = {
    property_id,
    street,
    city,
    state,
    zip_code,
    longitude,
    latitude,
  };

  PropertyModel.createPropertyAddress(propertyAddressData, (error, result) => {
    if (error) {
      console.error("Error creating property address: ", error);
      return res.status(500).json({ message: 'Error creating property address' });
    }

    return res.status(201).json({ message: 'Property address created successfully', propertyAddressId: result.insertId });
  });
};

propertyController.getAllPropertyAddress = (req, res) => {
  PropertyModel.getAllPropertyAddress((error, propertyAddresses) => {
    if (error) {
      console.error("Error getting all property addresses: ", error);
      return res.status(500).json({ message: 'Error getting property addresses' });
    }

    return res.status(200).json(propertyAddresses);
  });
};

propertyController.getPropertyAddressById = (req, res) => {
  const id = req.query.id;

  PropertyModel.getPropertyAddressById(id, (error, propertyAddresses) => {
    if (error) {
      console.error("Error getting property address by id: ", error);
      return res.status(500).json({ message: 'Error getting property address' });
    }

    return res.status(200).json(propertyAddresses);
  });
};

propertyController.getPropertyAddressByPropertyId = (req, res) => {
  const id = req.query.property_id;

  PropertyModel.getPropertyAddressByPropertyId(id, (error, propertyAddresses) => {
    if (error) {
      console.error("Error getting property address by id: ", error);
      return res.status(500).json({ message: 'Error getting property address' });
    }

    return res.status(200).json(propertyAddresses);
  });
};


propertyController.updatePropertyAddressById = (req, res) => {
  const addressId = req.body.address_id;
  const propertyAddressData = {
    property_id: req.body.property_id,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  };

  PropertyModel.updatePropertyAddressById(addressId, propertyAddressData, (error, result) => {
    if (error) {
      console.error("Error updating property address by id: ", error);
      return res.status(500).json({ message: 'Error updating property address' });
    }

    return res.status(200).json({ message: 'Property address updated successfully' });
  });
};

// Property Amenities

propertyController.createAmenities = (req, res) => {
  const amenitiesData = {
    property_id: req.body.property_id,
    name: req.body.name,
    quantity: req.body.quantity,
  };

  PropertyModel.createAmenities(amenitiesData, (error, result) => {
    if (error) {
      console.error("Error creating property amenities: ", error);
      return res.status(500).json({ message: 'Error creating property amenities' });
    }

    return res.status(200).json({ message: 'Property amenities created successfully' });
  });
};

propertyController.getAllAmenities = (req, res) => {
  PropertyModel.getAllAmenities((error, amenities) => {
    if (error) {
      console.error("Error getting property amenities: ", error);
      return res.status(500).json({ message: 'Error getting property amenities' });
    }

    return res.status(200).json(amenities);
  });
};

propertyController.getAmenitiesById = (req, res) => {
  const amenitiesId = req.query.id;

  if (!amenitiesId) {
    return res.status(400).json({ message: 'Amenities ID is missing in the request query' });
  }

  PropertyModel.getAmenitiesById(amenitiesId, (error, amenities) => {
    if (error) {
      console.error("Error getting property amenities by ID: ", error);
      return res.status(500).json({ message: 'Error getting property amenities' });
    }

    if (amenities.length === 0) {
      return res.status(404).json({ message: 'Amenities not found' });
    }

    return res.status(200).json(amenities);
  });
};

propertyController.getAmenitiesByPropertyId = (req, res) => {
  const propertyId = req.query.property_id;

  if (!propertyId) {
    return res.status(400).json({ message: 'Amenities ID is missing in the request query' });
  }

  PropertyModel.getAmenitiesByPropertyId(propertyId, (error, amenities) => {
    if (error) {
      console.error("Error getting property amenities by ID: ", error);
      return res.status(500).json({ message: 'Error getting property amenities' });
    }

    if (amenities.length === 0) {
      return res.status(404).json({ message: 'Amenities not found' });
    }

    return res.status(200).json(amenities);
  });
};

propertyController.updateAmenitiesById = (req, res) => {
  const { amenity_id, property_id, name, quantity } = req.body;

  if (!amenity_id || !property_id || !name || !quantity) {
    return res.status(400).json({ message: 'Please provide amenity_id, property_id, name, and quantity in the request body' });
  }

  const amenityData = {
    property_id,
    name,
    quantity,
  };

  PropertyModel.updateAmenitiesById(amenity_id, amenityData, (error, result) => {
    if (error) {
      console.error("Error updating property amenities by ID: ", error);
      return res.status(500).json({ message: 'Error updating property amenities' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Amenities not found or no changes made' });
    }

    return res.status(200).json({ message: 'Amenities updated successfully' });
  });
};


// Property Category

propertyController.createCategory = (req, res) => {
  const { property_id, name } = req.body;

  if (!property_id || !name) {
    return res.status(400).json({ message: 'Please provide property_id and name in the request body' });
  }

  const categoryData = {
    property_id,
    name,
  };

  PropertyModel.createCategory(categoryData, (error, result) => {
    if (error) {
      console.error("Error creating property category: ", error);
      return res.status(500).json({ message: 'Error creating property category' });
    }

    return res.status(200).json({ message: 'Property category created successfully', categoryId: result.insertId });
  });
};

propertyController.getAllCategory = (req, res) => {
  PropertyModel.getAllCategory((error, categories) => {
    if (error) {
      console.error("Error getting all property categories: ", error);
      return res.status(500).json({ message: 'Error getting property categories' });
    }

    return res.status(200).json(categories);
  });
};


propertyController.getCategoryById = (req, res) => {
  const categoryId = req.query.id;

  PropertyModel.getCategoryById(categoryId, (error, category) => {
    if (error) {
      console.error("Error getting property category by id: ", error);
      return res.status(500).json({ message: 'Error getting property category' });
    }

    if (category.length === 0) {
      return res.status(404).json({ message: 'Property category not found' });
    }

    return res.status(200).json(category[0]);
  });
};

propertyController.getCategoryByPropertyId = (req, res) => {
  const propertyId = req.query.property_id;

  if (!propertyId) {
    return res.status(400).json({ message: 'Property ID is missing in the request query' });
  }

  PropertyModel.getCategoryByPropertyId(propertyId, (error, amenities) => {
    if (error) {
      console.error("Error getting property categories by property ID: ", error);
      return res.status(500).json({ message: 'Error getting property category' });
    }

    if (amenities.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(amenities);
  });
};

propertyController.updateCategoryById = (req, res) => {
  const categoryId = req.body.category_id;
  const { property_id, name } = req.body;

  const categoryData = {
    property_id,
    name,
  };

  PropertyModel.updateCategoryById(categoryId, categoryData, (error, result) => {
    if (error) {
      console.error("Error updating property category: ", error);
      return res.status(500).json({ message: 'Error updating property category' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property category not found' });
    }

    return res.status(200).json({ message: 'Property category updated successfully' });
  });
};


// Property Facilities

propertyController.createFacility = (req, res) => {
  const { property_id, name, quantity } = req.body;

  const facilityData = {
    property_id,
    name,
    quantity,
  };

  PropertyModel.createFacility(facilityData, (error, result) => {
    if (error) {
      console.error("Error creating property facility: ", error);
      return res.status(500).json({ message: 'Error creating property facility' });
    }

    return res.status(200).json({
      message: "Property facility created successfully",
      facilityId: result.insertId
    });
  });
};

propertyController.getAllFacility = (req, res) => {
  PropertyModel.getAllFacilities((error, facilities) => {
    if (error) {
      console.error("Error getting all property facilities: ", error);
      return res.status(500).json({ message: 'Error getting property facilities' });
    }

    return res.status(200).json(facilities);
  });
};

propertyController.getFacilityById = (req, res) => {
  const facilityId = req.query.id;

  PropertyModel.getFacilityById(facilityId, (error, facility) => {
    if (error) {
      console.error("Error getting property facility by id: ", error);
      return res.status(500).json({ message: 'Error getting property facility by id' });
    }

    if (!facility || facility.length === 0) {
      return res.status(404).json({ message: 'Property facility not found' });
    }

    return res.status(200).json(facility[0]);
  });
};

propertyController.getFacilityByPropertyId = (req, res) => {
  const propertyId = req.query.property_id;

  if (!propertyId) {
    return res.status(400).json({ message: 'Property ID is missing in the request query' });
  }

  PropertyModel.getFacilityByPropertyId(propertyId, (error, facility) => {
    if (error) {
      console.error("Error getting property facility by property ID: ", error);
      return res.status(500).json({ message: 'Error getting property facility' });
    }

    if (facility.length === 0) {
      return res.status(404).json({ message: 'facility not found' });
    }

    return res.status(200).json(facility);
  });
};

propertyController.updateFacilityById = (req, res) => {
  const facilityData = req.body;

  PropertyModel.updateFacilityById(facilityData, (error, result) => {
    if (error) {
      console.error("Error updating property facility by id: ", error);
      return res.status(500).json({ message: 'Error updating property facility by id' });
    }

    return res.status(200).json({ message: 'Property facility updated successfully' });
  });
};


// Property Safety Items


propertyController.createSafetyItems = (req, res) => {
  const safetyData = req.body;

  PropertyModel.createSafetyItems(safetyData, (error, result) => {
    if (error) {
      console.error("Error creating property safety items: ", error);
      return res.status(500).json({ message: 'Error creating property safety items' });
    }

    return res.status(200).json({ message: 'Property safety items created successfully' });
  });
};

propertyController.getAllSafetyItems = (req, res) => {
  PropertyModel.getAllSafetyItems((error, safetyItems) => {
    if (error) {
      console.error("Error getting all property safety items: ", error);
      return res.status(500).json({ message: 'Error getting property safety items' });
    }

    return res.status(200).json(safetyItems);
  });
};

propertyController.getSafetyItemsById = (req, res) => {
  const { id } = req.query;

  PropertyModel.getSafetyItemsById(id, (error, safetyItems) => {
    if (error) {
      console.error("Error getting property safety items by ID: ", error);
      return res.status(500).json({ message: 'Error getting property safety items' });
    }

    if (safetyItems.length === 0) {
      return res.status(404).json({ message: 'Property safety items not found' });
    }

    return res.status(200).json(safetyItems);
  });
};

propertyController.getSafetyItemsByPropertyId = (req, res) => {
  const propertyId = req.query.property_id;

  if (!propertyId) {
    return res.status(400).json({ message: 'Property ID is missing in the request query' });
  }

  PropertyModel.getSafetyItemsByPropertyId(propertyId, (error, safetyItems) => {
    if (error) {
      console.error("Error getting property safety items by property ID: ", error);
      return res.status(500).json({ message: 'Error getting property safety items' });
    }

    if (safetyItems.length === 0) {
      return res.status(404).json({ message: 'safety items not found' });
    }

    return res.status(200).json(safetyItems);
  });
};

propertyController.updateSafetyItemsById = (req, res) => {
  const { safety_item_id, property_id, name, quantity } = req.body;

  if (!safety_item_id || !property_id || !name || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const updatedData = {
    property_id,
    name,
    quantity,
  };

  PropertyModel.updateSafetyItemsById(safety_item_id, updatedData, (error, affectedRows) => {
    if (error) {
      console.error("Error updating property safety items by ID: ", error);
      return res.status(500).json({ message: 'Error updating property safety items' });
    }

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Property safety item not found' });
    }

    return res.status(200).json({ message: 'Property safety item updated successfully' });
  });
};


// Get facilities by user_id
propertyController.getAllFacilitiesByUserId = (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing in query parameter' });
  }

  PropertyModel.getAllFacilitiesByUserId(userId, (error, facilities) => {
    if (error) {
      console.error('Error getting facilities by User ID: ', error);
      return res.status(500).json({ message: 'Error getting facilities by User ID' });
    }

    if (facilities.length === 0) {
      return res.status(404).json({ message: 'No facilities found for the given User ID' });
    }

    return res.status(200).json(facilities);
  });
};




module.exports = propertyController
