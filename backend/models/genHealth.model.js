const mongoose = require("mongoose");

const genHealthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  infoTitle: {
    type: String,
    required: true,
  },
  bpType: {
    type: String,
  },
  info: {
    type: Number,
    required: true,
  },
  inputDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("genHealth", genHealthSchema);
