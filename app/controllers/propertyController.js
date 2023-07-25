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


module.exports = propertyController
