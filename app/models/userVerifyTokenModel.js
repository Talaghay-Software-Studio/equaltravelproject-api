const dbConn = require('../config/db.config');

const userVerifyTokenModel = {};

userVerifyTokenModel.verifyToken = (token, callback) => {
  dbConn.query(
    "SELECT user.*, user_details.* FROM user JOIN user_details ON user.id = user_details.user_id WHERE user.token = ?",
    [token],
    (error, results) => {
      if (error) {
        console.error("Error verifying token: ", error);
        return callback(error, null);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      const user = {
        id: results[0].id,
        email_add: results[0].email_add,
        userDetails: {
          id: results[0].user_id,
          first_name: results[0].first_name,
          last_name: results[0].last_name,
          birth_date: results[0].birth_date,
          country: results[0].country,
          phone_number: results[0].phone_number,
          
        }
      };

      return callback(null, user);
    }
  );
};

module.exports = userVerifyTokenModel;
