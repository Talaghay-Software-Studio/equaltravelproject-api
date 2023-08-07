const dbConn = require("../config/db.config");

const User = {};

User.getAllUserData = (callback) => {
  // Query to retrieve data from user and user_details tables
  const query = `
    SELECT user.id, user.email_add, user_details.first_name, user_details.last_name, user_details.birth_date, user_details.country, user_details.phone_number, user_details.accessibility_needs
    FROM user
    JOIN user_details ON user.id = user_details.user_id
  `;

  // Execute the query
  dbConn.query(query, (error, result) => {
    if (error) {
      console.error("Error retrieving user data: ", error);
      return callback(error, null);
    } else {
      return callback(null, result);
    }
  });
};

User.getUserById = (userId, callback) => {
    // Query to retrieve data from user and user_details tables based on the provided id
    const query = `
      SELECT user.id, user.email_add, user_details.first_name, user_details.last_name, user_details.birth_date, user_details.country, user_details.phone_number, user_details.accessibility_needs, user_details.created_at, user_details.modified_at
      FROM user
      JOIN user_details ON user.id = user_details.user_id
      WHERE user.id = ?
    `;
  
    // Execute the query with the provided userId
    dbConn.query(query, [userId], (error, result) => {
      if (error) {
        console.error("Error retrieving user data: ", error);
        return callback(error, null);
      } else {
        return callback(null, result);
      }
    });
  };

  User.updateUserDetailsById = (userId, userDetails, callback) => {
    const { first_name, last_name, birth_date, country, phone_number, accessibility_needs } = userDetails;
  
    const query = `
      UPDATE user_details
      SET first_name = ?, last_name = ?, birth_date = ?, country = ?, phone_number = ?, accessibility_needs = ?
      WHERE user_id = ?
    `;
  
    dbConn.query(
      query,
      [first_name, last_name, birth_date, country, phone_number, accessibility_needs, userId],
      (error, result) => {
        if (error) {
          console.error("Error updating user details: ", error);
          return callback(error, null);
        } else {
          return callback(null, result);
        }
      }
    );
  };

  User.deleteUserById = (userId, callback) => {
    // Delete the user from the user_details table based on the provided userId
    const deleteUserDetailsQuery = "DELETE FROM user_details WHERE user_id = ?";
  
    // Delete the user from the user table based on the provided userId
    const deleteUserQuery = "DELETE FROM user WHERE id = ?";
  
    dbConn.beginTransaction((err) => {
      if (err) {
        console.error("Error starting database transaction: ", err);
        return callback(err, null);
      }
  
      dbConn.query(deleteUserDetailsQuery, [userId], (error, result) => {
        if (error) {
          console.error("Error deleting user from user_details table: ", error);
          return dbConn.rollback(() => callback(error, null));
        }
  
        dbConn.query(deleteUserQuery, [userId], (error, result) => {
          if (error) {
            console.error("Error deleting user from user table: ", error);
            return dbConn.rollback(() => callback(error, null));
          }
  
          dbConn.commit((err) => {
            if (err) {
              console.error("Error committing transaction: ", err);
              return dbConn.rollback(() => callback(err, null));
            }
  
            return callback(null, result);
          });
        });
      });
    });
  };
  
  module.exports = User;
  