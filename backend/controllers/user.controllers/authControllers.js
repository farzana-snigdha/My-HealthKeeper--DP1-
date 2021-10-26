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

const authControllers = {
  register: async (req, res) => {
    try {
      const { name, email, password, gender, phone } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
        gender,
        phone,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(
        email,
        url,
        "Click the button below to validate your email address.",
        "Verify your email address",
        "If the button doesn't work for any reason, you can also click on the link below:"
      );

      res.json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password, gender, phone } = user;

      const check = await User.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });
      // phone={1,2,3}
      const newUser = new User({
        name,
        email,
        password,
        gender,
        phone,
      });

      await newUser.save();

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 200 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });
      // console.log("dwdwdw  ",rf_token)
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      const { email_verified, email, name, picture } = verify.payload;

      const password = email + process.env.GOOGLE_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res.status(400).json({ msg: "Email verification failed." });

      const user = await User.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });

        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 200 * 24 * 60 * 60 * 1000, // 2000 days
        });
        res.json({ aa: moment(user.dateOfBirth).format("L") });
        res.json({ msg: "Login success!" });
      } else {
        const newUser = new User({
          name,
          email,
          password: passwordHash,
          avatar: picture,
        });

        await newUser.save();

        const refresh_token = createRefreshToken({ id: newUser._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 200 * 24 * 60 * 60 * 1000, // 2000 days
        });

        res.json({ msg: "Login success!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "200d",
  });
};

module.exports = authControllers;
