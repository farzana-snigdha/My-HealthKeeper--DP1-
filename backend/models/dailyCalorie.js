const mongoose = require("mongoose");

const dailyCalorie = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  consumedCalories: {
    type: Number,
  },
  requiredCalories: {
    type:Number
  },
  burnedCalories:{
    type:Number,
    default:0
  },
  date: {
    type: Date,

  },
});

module.exports = mongoose.model("daily_calorie", dailyCalorie);