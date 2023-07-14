const UserModel = require('../models/userLoginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLoginController = {};

userLoginController.checkEmail = (req, res) => {
  const { email_add, password } = req.body;

  UserModel.getByEmail(email_add, (error, user) => {
    if (error) {
      console.error("Error checking email: ", error);
      return res.status(500).send("Error checking email");
    }

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords: ", err);
        return res.status(500).send("Error comparing passwords");
      }

      if (!isMatch) {
        return res.status(401).send("Invalid password");
      }

      // Password is correct, retrieve user details
      UserModel.getUserDetails(user.id, (error, userDetails) => {
        if (error) {
          console.error("Error retrieving user details: ", error);
          return res.status(500).send("Error retrieving user details");
        }

        // Combine user data
        const userData = {
          userId: user.id,
          email: user.email_add,
          userDetails
        };

        // Generate JWT with user data and set expiration to 5 minutes
        const token = jwt.sign(userData, 'your_secret_key', { expiresIn: '5m' });

        // Update user table with the token
        UserModel.updateToken(user.id, token, (error) => {
          if (error) {
            console.error("Error updating token: ", error);
            return res.status(500).send("Error updating token");
          }

          // Return token
          res.status(200).json({
            message: "Login successful",
            token
          });
        });
      });
    });
  });
};






userLoginController.checkEmailDB = (req, res) => {
  const { email_add } = req.body;

  UserModel.getByEmail(email_add, (error, user) => {
    if (error) {
      console.error("Error checking email: ", error);
      return res.status(500).send("Error checking email");
    }

    if (user) {
      return res.status(200).send("Email found");
    }

    return res.status(404).send("Email not found");
  });
};

module.exports = userLoginController;
