const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    userId: String,
    comment: String,
    likes: Array,
}
    , { timestamps: true });

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        default: "",
    },
    fileName: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        max: 1000,
        default: "",
    },
    likes: {
        type: Array,
        default: [],
    },
    comments: [comment],
    img: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);