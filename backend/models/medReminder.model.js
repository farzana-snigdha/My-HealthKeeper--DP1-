const mongoose = require('mongoose')

const medReminderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    username: {
        type: String,
        required: true
    },
    medname: {
        type: String,
        required: true
    },
    descriptionmed:{
        type: String
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    },
    time : []
})

module.exports = mongoose.model('medicines', medReminderSchema)