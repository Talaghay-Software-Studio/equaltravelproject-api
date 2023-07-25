const PropertyModel = require('../models/property');

const propertyController = {};

propertyController.createProperty = (req, res) => {
  const {
    user_id,
    title,
    status,
    price,
    description,
  } = req.body;

  const propertyData = {
    user_id,
    title,
    status,
    price,
    description,
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



module.exports = propertyController
