const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS module
const app = express();
const port = process.env.PORT || 8000;
const ejs = require('ejs');
const cookieParser = require('cookie-parser'); // Import cookie-parser
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  console.log(`Requested URL: ${req.url}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

var corsOptions = {
  origin: ["http://localhost:3000", "http://18.191.79.11:8080", "http://18.189.30.93"],
  credentials: true
  };
  
  app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("It's working");
});

// routes should be here
const userSignupRoute = require("./app/routes/userSignupRoutes");
const userLoginRoute = require("./app/routes/userLoginRoutes");
const userResetPasswordRoute = require("./app/routes/userResetPasswordRoutes");
const userVerifyTokenRoute = require("./app/routes/userVerifyTokenRoutes");
const userLogoutRoute = require("./app/routes/userLogoutRoutes");
const userRoute = require("./app/routes/userRoutes");
const propertyRoute = require("./app/routes/propertyRoute");
const uploadPhotoRoute = require("./app/routes/uploadPhotoRoute");

//middlewares here
app.use("/api/v1/signup", userSignupRoute)
app.use("/api/v1/login", userLoginRoute)
app.use("/api/v1", userResetPasswordRoute)
app.use("/api/v1/auth", userVerifyTokenRoute)
app.use("/api/v1/logout", userLogoutRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/property", propertyRoute)
app.use("/api/v1/upload", uploadPhotoRoute)


//port listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
module.exports = app;