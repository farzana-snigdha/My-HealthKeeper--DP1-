const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dietTargetSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    gender: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    levelOfActivity: {
      type: String,
    },
    target: {
      type: String,
    },
    dailyRequiredCalories: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("diet_target_schema", dietTargetSchema);
