const UserModel = require('../models/userLoginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const userLoginController = {};

userLoginController.checkEmail = (req, res) => {
  const { email_add, password } = req.body;

  UserModel.getByEmail(email_add, async (error, user) => {
    if (error) {
      console.error("Error checking email: ", error);
      return res.status(500).send("Error checking email");
    }

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    // Password is correct, generate tokens
    const accessToken = jwt.sign(
      { email_add: user.email_add },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { email_add: user.email_add },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Store the refresh token as an HTTP-only secure cookie with a 7-day expiration
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return the access token in the response as a JSON object
    res.status(200).json({
      message: "Login successful",
      token: accessToken
    });
  });
};

userLoginController.refreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const refreshToken = cookies.jwt;

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Get the user based on the decoded information (e.g., email)
    const foundUser = await UserModel.getEmail(decoded.email_add);

    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Generate a new access token with updated information (e.g., username and roles)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email_add: foundUser.email_add
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // Return the new access token in the response
    res.json({ accessToken });

    // Don't forget to call next() after successful token verification
    next();
  } catch (err) {
    // If the refresh token is invalid or has expired
    return res.status(403).json({ message: 'Forbidden' });
  }
});


userLoginController.checkEmailDB = (req, res) => {
  const { email_add } = req.body;

  UserModel.getByEmail(email_add, (error, user) => {
    if (error) {
      console.error("Error checking email: ", error);
      return res.status(500).send("Error checking email");
    }

    if (user) {
      return res.status(200).send("Email found");
    }

    return res.status(404).send("Email not found");
  });
};

module.exports = userLoginController;
