const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    folder: {
      type: String,
      required: true,
      unique:true
    },
    description: {
      type: String,
      // required: true
    },
    noteDate: {
      type: Date,
      default: new Date(),
    },
    files: [Object],
    numberOfFiles: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MultipleFile", mulitipleFileSchema);
