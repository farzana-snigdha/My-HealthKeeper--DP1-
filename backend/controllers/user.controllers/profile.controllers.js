const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CLIENT_URL } = process.env;
const sendMail = require("../sendMail.Controllers");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");
const moment = require("moment");
const ProfileImageModel = require("../../models/profileImage.models");
const PaymentModel = require("../../models/Payment.models");
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const profileControllers = {
  getUserInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, phone, gender, height, bloodGrp } = req.body;
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          phone,
          gender,
          height,
          bloodGrp,
        }
      );

      res.json({ msg: "Update Success! Please refresh the page now" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserPasymentStatus: async (req, res) => {
    PaymentModel.find({
      user: req.user.id,
      paymentDone: true,
    }).then((res2) => {
      if(res2.length>0){
        res.send(true)
      }
      else res.send(false)
    });
  },
  setProfilePicture: async (req, res) => {
    try {
      // console.log("cdc ",req.file)
      ProfileImageModel.findOne({ user: req.user.id })
        .then((ans) => {
          console.log(ans);
          if (ans) {
            console.log("jjeelloo");
            ProfileImageModel.findOneAndUpdate(
              { user: req.user.id },
              {
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
              }
            ).then(() => {
              console.log("File Updated Successfully");
              res.status(201).send("File Updated Successfully");
            });
          } else {
            const file = new ProfileImageModel({
              user: req.user.id,
              fileName: req.file.originalname,
              filePath: req.file.path,
              fileType: req.file.mimetype,
              fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
            });
            file.save().then(() => {
              console.log("File Uploaded Successfully");
              res.status(201).send("File Uploaded Successfully");
            });
          }
        })
        .catch((err) => {
          console.log("profile image save ", err);
        });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getProfileImage: async (req, res) => {
    try {
      const files = await ProfileImageModel.findOne({ user: req.user.id });
      console.log("getProfile_image ", files);
      res.status(200).send(files);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = profileControllers;
