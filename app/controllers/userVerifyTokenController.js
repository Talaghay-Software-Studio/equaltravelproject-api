const jwt = require('jsonwebtoken');

const userVerifyTokenController = {};

userVerifyTokenController.checkToken = (req, res, next) => { // Add 'next' as the third parameter
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.email_add = decoded.UserInfo.email_add;

    next(); // Call 'next' to pass control to the next middleware/route
  });
};

module.exports = userVerifyTokenController;
