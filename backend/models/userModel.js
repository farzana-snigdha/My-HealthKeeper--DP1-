const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "Male",
  },
  phone: {
    type: String,
  },
 height:{type:String},
 bloodGrp:{type:String},
  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("users", UserSchema);
