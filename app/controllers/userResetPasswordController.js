const User = require("../models/userResetPasswordModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.resetPassword = (req, res) => {
    const { token } = req.params;
    const newPassword = req.body.password;
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid token" });
      }
  
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error hashing password" });
        }
  
        User.resetPassword(decoded.email_add, hashedPassword, (err, data) => {
          if (err) {
            console.error(err);
            if (err.kind === "not_found") {
              return res.status(404).json({ error: "User not found" });
            } else {
              return res.status(500).json({ error: "Error updating user" });
            }
          }
  
          // Redirect the user to the success page with a query parameter
          res.redirect('/reset-password/success');
        });
      });
    });
  };
  
  



exports.forgotPassword = (req, res) => {
  const email_add = req.body.email_add;
  User.findByEmail(email_add, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ error: "User not found" });
      } else {
        return res.status(500).json({ error: "Error retrieving user" });
      }
    } else {
      const token = jwt.sign({ id: data.id, email_add: data.email_add }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });
    //   const resetLink = `http://localhost:8000/api/v1/resetpassword/${token}`;
    const resetLink = `http://3.135.237.241:8000/api/v1/resetpassword/${token}`; 
      // Create a transport object to send the email
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: "robertchristian.rosales@gmail.com",
          pass: "lxkepxxjeixoymtu",
        },
      });

      const mailOptions = {
        from: "Equal Travel Accounts <noreply@gmail.com>",
        to: email_add,
        subject: "Reset your password",
        text: `Click on the following link to reset your password: ${resetLink}. This link will expire in 5 minutes`,
        html: `<p>Click on the following link to reset your password. This link will expire in 5 minutes</p><a href="${resetLink}">${resetLink}</a>`,
      };

      // Send the email
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Error sending email" });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: "Reset password link sent to email. Check Spam if not seen on inbox" });
        }
      });
    }
  });
};

exports.verifyJWT = (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).send("Unauthorized or the token has been expired");
    }
    const { email_add } = decoded;
    res.render("resetpassword", { token, email_add });
  });
};


