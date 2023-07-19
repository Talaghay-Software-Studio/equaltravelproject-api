const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  // Remove "Bearer " prefix from the token
  const tokenWithoutPrefix = token.replace("Bearer ", "");
  console.log(tokenWithoutPrefix)

  const decoded = jwt.decode(tokenWithoutPrefix);
  console.log(decoded);

  if (!decoded) {
    console.error("Token decoding error.");
    return res.status(403).send("Invalid token.");
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;
