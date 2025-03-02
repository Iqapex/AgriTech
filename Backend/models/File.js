const mongoose = require('mongoose');


const FileSchema = new mongoose.Schema({
    sharedWith: {
        type: Array,
    },
    owner: {
        type: String,
        default: ""
    },
    fileName: {
        type: String,
    },
    storedName: {
        type: String,
        unique: true,
    },
    inBin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);