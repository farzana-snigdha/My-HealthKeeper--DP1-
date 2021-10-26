const mongoose = require('mongoose');


const profileImageSchema = new  mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('profile_Image_Schema', profileImageSchema);