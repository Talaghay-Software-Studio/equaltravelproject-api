const dbConn = require("../config/db.config");
const bcrypt = require('bcrypt');

const User = {};

User.create = (newUser, callback) => {
  // Hash the password
  const saltRounds = 10;
  const password = newUser.password.toString();
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password: ", err);
      return callback(err, null);
    } else {
      // Insert the user into the database
      dbConn.query(
        "INSERT INTO user (email_add, password) VALUES (?, ?)",
        [newUser.email_add, hashedPassword],
        (error, result) => {
          if (error) {
            console.error("Error inserting user into database: ", error);
            return callback(error, null);
          } else {
            const userId = result.insertId; // Retrieve the auto-generated user ID

            // Insert user details into the 'user_details' table
            dbConn.query(
              "INSERT INTO user_details (user_id, first_name, last_name, birth_date, country, phone_number) VALUES (?, ?, ?, ?, ?, ?)",
              [userId, newUser.first_name, newUser.last_name, newUser.birth_date, newUser.country, newUser.phone_number],
              (error, result) => {
                if (error) {
                  console.error("Error inserting user details into database: ", error);
                  return callback(error, null);
                } else {
                  return callback(null, result);
                }
              }
            );
          }
        }
      );
    }
  });
};

module.exports = User;
