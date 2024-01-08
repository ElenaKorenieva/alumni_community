const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    text: {
        type: String,
        maxLength: 4000,
        required: true,
    },
    user: {
        type: String,
        maxLength: 40,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const postSchema = new Schema({
    topic: {
        type: String,
        required: true,
        maxLength: 40,
        minLength: 1,
    },
    user: {
        type: String,
        required: true,
        maxLength: 40,
        minLength: 1,
    },
    title: {
        type: String,
        required: true,
        maxLength: 60,
        minLength: 1,
    },
    message: {
        type: String,
        required: true,
        maxLength: 4000,
        minLength: 1,
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    comments: [commentSchema],
    image: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
