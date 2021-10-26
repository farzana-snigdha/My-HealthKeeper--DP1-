const mongoose = require("mongoose");

const consumedCalories = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  meal: {
    type : String,
    required: true,
  },
  food: {
    type : String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  consumedCalories: {
    type: Number,
  },
requiredCalories:{type:Number},
  date: {
    type: Date,
    default : Date.now
  },
});

module.exports = mongoose.model("consumed_calories_schema", consumedCalories);