const mongoose = require("mongoose");

const medDoseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  doseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medicines",
  },
  medname: {
    type: String,
    required: true,
  },
  meddate: {
    type: Date,
    required: true,
  },
  medtime: {
    type: String,
    required: true,
  },
  isTaken: {
    type: Boolean,
    required: true,
  },
  isReminded: {
    type: Boolean,
    default: false,
  },
  userEmail: {
    type: String,
  },
});

module.exports = mongoose.model("medicineDoses", medDoseSchema);
