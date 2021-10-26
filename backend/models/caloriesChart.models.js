const mongoose = require("mongoose");

const calorieChart = new mongoose.Schema({
  category:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("calorie_chart", calorieChart);
