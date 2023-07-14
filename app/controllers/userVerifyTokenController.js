const userVerifyTokenModel = require('../models/userVerifyTokenModel');

const userVerifyTokenController = {};

userVerifyTokenController.checkToken = (req, res) => {
  const { token } = req.body;

  userVerifyTokenModel.verifyToken(token, (error, user) => {
    if (error) {
      console.error("Error verifying token: ", error);
      return res.status(500).json({ message: "Error verifying token" });
    }

    if (!user) {
      return res.status(404).json({ message: "No token found" });
    }

    // Token exists and is valid
    res.status(200).json({ message: "Token is valid", user });
  });
};

module.exports = userVerifyTokenController;
