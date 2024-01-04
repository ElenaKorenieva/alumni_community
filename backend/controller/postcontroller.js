const { default: mongoose } = require("mongoose");
const { ctrlWrapper } = require("../helper");

const Post = require('../model/Post')

const getPostsByTopic = async (req, res) => {
    try {
        console.log(req.user);
        const posts = await Post.find({ topic: req.query.topic });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createNewPost = async (req, res) => {
    try {
        console.log(req.user);

        const post = new Post({ topic: req.body.topic, user: req.user.name, message: req.body.message });
        await post.save();

        res.status(201).json({ success: true, message: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deletePost = (req, res) => {
    const messageId = req.params.id;
    const postId = new mongoose.Types.ObjectId(messageId);

    Post.findByIdAndDelete(postId)
        .then(result => {
            if (!result) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }
            return res.status(204).json({ success: true, message: "Post deleted successfully" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, message: "Internal server error" });
        });
};


const editMessage = async (req, res) => {
    const messageId = req.params.id;
    const postId = new mongoose.Types.ObjectId(messageId);

    const { message } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(
            postId,
            { $set: { message } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        res.status(200).json({ success: true, message: "Message updated successfully", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = {
    getPostsByTopic: ctrlWrapper(getPostsByTopic),
    createNewPost: ctrlWrapper(createNewPost),
    deletePost: ctrlWrapper(deletePost),
    editMessage: ctrlWrapper(editMessage)
}