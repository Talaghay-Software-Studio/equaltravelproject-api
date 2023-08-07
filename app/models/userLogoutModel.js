const dbConn = require('../config/db.config');

const userLogoutModel = {};

userLogoutModel.deleteToken = (userId, callback) => {
  dbConn.query(
    "UPDATE user SET token = NULL WHERE id = ?",
    [userId],
    (error) => {
      if (error) {
        console.error("Error deleting token: ", error);
        return callback(error);
      }

      return callback(null);
    }
  );
};

module.exports = userLogoutModel;
