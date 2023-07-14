const userVerifyTokenModel = require('../models/userVerifyTokenModel');

const userVerifyTokenController = {};

userVerifyTokenController.checkToken = (req, res) => {
  const { token } = req.body;

  userVerifyTokenModel.verifyToken(token, (error, decoded) => {
    if (error) {
      console.error("Error verifying token: ", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    // Token is valid
    res.status(200).json({ message: "Token is valid", decoded });
  });
};

module.exports = userVerifyTokenController;