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





module.exports = propertyController
