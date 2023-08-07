const jwt = require('jsonwebtoken');

const verifyTokenController = {};

verifyTokenController.verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // If verification is successful, return the decoded token in the response
    res.status(200).json({ decodedToken: decoded });
  });
};

module.exports = verifyTokenController;
