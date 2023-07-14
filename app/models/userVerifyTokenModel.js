const jwt = require('jsonwebtoken');

const userVerifyTokenModel = {};

userVerifyTokenModel.verifyToken = (token, callback) => {
  jwt.verify(token, 'your_secret_key', (error, decoded) => {
    if (error) {
      return callback(error, null);
    }

    return callback(null, decoded);
  });
};

module.exports = userVerifyTokenModel;