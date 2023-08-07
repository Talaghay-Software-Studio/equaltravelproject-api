const dbConn = require("../config/db.config");

const UserModel = {};

UserModel.getByEmail = (email, callback) => {
  dbConn.query(
    "SELECT * FROM user WHERE email_add = ?",
    [email],
    (error, result) => {
      if (error) {
        console.error("Error retrieving user by email: ", error);
        return callback(error, null);
      }

      if (result.length > 0) {
        return callback(null, result[0]);
      } else {
        return callback(null, null);
      }
    }
  );
};

UserModel.getUserDetails = (userId, callback) => {
  dbConn.query(
    "SELECT * FROM user_details WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.error("Error retrieving user details: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

UserModel.updateToken = (userId, token, callback) => {
  dbConn.query(
    "UPDATE user SET token = ? WHERE id = ?",
    [token, userId],
    (error) => {
      if (error) {
        console.error("Error updating token: ", error);
        return callback(error);
      }

      return callback(null);
    }
  );
};

UserModel.getEmail = (email) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT * FROM user WHERE email_add = ?",
      [email],
      (error, result) => {
        if (error) {
          console.error("Error retrieving user by email: ", error);
          reject(error);
        }

        if (result.length > 0) {
          resolve(result[0]); // Resolve with the user data
        } else {
          resolve(null); // Resolve with null if no user found
        }
      }
    );
  });
};


module.exports = UserModel;
