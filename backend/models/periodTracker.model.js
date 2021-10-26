const mongoose = require("mongoose");

const CycleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  duration: {
    type: String,
  },
  cycleLength: {
    type: Number,
  },
  notes: [
    {
      eventDate: {
        type: Date,
      },
      mood: {
        type: String,
      },
      symptoms: {
        type: String,
      },
      flow: {
        type: String,
      },
    },
  ],
  isReminded:{
    type:Boolean,
    default:false
  },
  userEmail:{
    type:String
  },
});

module.exports = mongoose.model("Cycle_Schema", CycleSchema);
