const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CLIENT_URL } = process.env;
const sendMail = require("../sendMail.Controllers");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");
const moment = require("moment");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const passwordChangeControllers={
    forgotPassword: async (req, res) => {
        try {
          const { email } = req.body;
          const user = await User.findOne({ email });
          if (!user)
            return res.status(400).json({ msg: "This email does not exist." });
    
          const access_token = createAccessToken({ id: user._id });
          const url = `${CLIENT_URL}/user/reset/${access_token}`;
    
          sendMail(
            email,
            url,
            "Click the button below to validate your email address.",
            "Reset your password",
            "If the button doesn't work for any reason, you can also click on the link below:"
          );
          res.json({ msg: "Re-send the password, please check your email." });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      resetPassword: async (req, res) => {
        try {
          const { password } = req.body;
          console.log(password);
          const passwordHash = await bcrypt.hash(password, 12);
    
          await User.findOneAndUpdate(
            { _id: req.user.id },
            {
              password: passwordHash,
            }
          );
          console.log(passwordHash);
          res.json({ msg: "Password successfully changed!" });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
    
}
module.exports=passwordChangeControllers