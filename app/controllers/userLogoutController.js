const userLogoutModel = require('../models/userLogoutModel');

const userLogoutController = {};

userLogoutController.deleteToken = (req, res) => {
  const userId = req.body.user_id;

  userLogoutModel.deleteToken(userId, (error) => {
    if (error) {
      console.error("Error deleting token: ", error);
      return res.status(500).send("Error deleting token");
    }

    // Token deleted successfully
    res.status(200).json({ message: "Token deleted" });
  });
};

module.exports = userLogoutController;
