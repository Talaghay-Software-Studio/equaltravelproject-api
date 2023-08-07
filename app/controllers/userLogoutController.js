const userLogoutController = {};

userLogoutController.deleteToken = (req, res) => {
  // Clear the 'jwt' cookie
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  // Send a response indicating that the cookie is cleared
  res.json({ message: 'Cookie cleared' });
};

module.exports = userLogoutController;
