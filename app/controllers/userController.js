const UserModel = require("../models/userModel");

exports.getUser = (req, res) => {
  UserModel.getAllUserData((error, result) => {
    if (error) {
      console.error("Error retrieving user data: ", error);
      res.status(500).send("Error retrieving user data");
    } else {
      console.log("User data retrieved successfully");
      res.status(200).json(result);
    }
  });
};

exports.getUserById = (req, res) => {
    const userId = req.query.id; // Assuming the id is passed as a query parameter
  
    if (!userId) {
      return res.status(400).json({
        message: "Missing userId parameter"
      });
    }
  
    UserModel.getUserById(userId, (error, result) => {
      if (error) {
        console.error("Error retrieving user data: ", error);
        res.status(500).send("Error retrieving user data");
      } else {
        if (result.length === 0) {
          res.status(404).json({
            message: "User not found"
          });
        } else {
          console.log("User data retrieved successfully");
          res.status(200).json(result);
        }
      }
    });
  };

  exports.updateUserById = (req, res) => {
    const userId = req.body.user_id;
    const { first_name, last_name, birth_date, country, phone_number, accessibility_needs } = req.body;
  
    if (!userId) {
      return res.status(400).json({
        message: "Missing user_id parameter"
      });
    }
  
    if (!first_name || !last_name) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }
  
    const defaultChoices = [
      "Mobility or Physical Impairment",
      "Visual Impairment",
      "Hearing Impairment",
      "Cognitive or Learning Impairment",
      "Speech Impairment",
      "Mental Health Impairments",
      "Chronic Health Conditions"
    ];
  
    const accessibilityNeeds = [accessibility_needs] || [];
    const validatedNeeds = defaultChoices.filter(
      need => need.toLowerCase() === accessibilityNeeds[0]?.toLowerCase()
    );
  
    if (accessibilityNeeds[0] && validatedNeeds.length === 0) {
      return res.status(400).json({
        message: "Invalid accessibility_needs",
        choices: defaultChoices
      });
    }
  
    UserModel.updateUserDetailsById(
      userId,
      {
        first_name,
        last_name,
        birth_date: birth_date || null,
        country,
        phone_number,
        accessibility_needs: accessibility_needs || null
      },
      (error, result) => {
        if (error) {
          console.error("Error updating user details: ", error);
          res.status(500).send("Error updating user details");
        } else {
          if (result.affectedRows === 0) {
            res.status(404).json({
              message: "User not found"
            });
          } else {
            console.log("User details updated successfully");
            res.status(200).json({
              message: "User details updated successfully",
              data: result
            });
          }
        }
      }
    );
  };
  
  exports.deleteUserById = (req, res) => {
    const userId = req.query.id; // Assuming the id is passed as a query parameter
  
    if (!userId) {
      return res.status(400).json({
        message: "Missing id parameter",
      });
    }
  
    UserModel.deleteUserById(userId, (error, result) => {
      if (error) {
        console.error("Error deleting user: ", error);
        res.status(500).send("Error deleting user");
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else {
          console.log("User deleted successfully");
          res.status(200).json({
            message: "User deleted successfully",
            data: result,
          });
        }
      }
    });
  };
  