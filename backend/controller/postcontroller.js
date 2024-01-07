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
        const post = new Post({ topic: req.body.topic, user: req.user.name, title: req.body.title, message: req.body.message });
        await post.save();

        res.status(201).json({ success: true, message: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deletePost = async (req, res) => {
    const messageId = req.params.id;
    const postId = new mongoose.Types.ObjectId(messageId);
    const user = req.user.name;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        if (post.user !== user) {
            return res.status(403).json({ success: false, message: "You can not delete this post" });
        }
        console.log(post.user);

        await post.remove();
        return res.status(204).json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const editMessage = async (req, res) => {
    const messageId = req.params.id;
    const postId = new mongoose.Types.ObjectId(messageId);
    const user = req.user.name;

    const { title, message } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        if (post.user !== user) {
            return res.status(403).json({ success: false, message: "You can not edit this post" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: { title, message } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Message not found after update" });
        }

        res.status(200).json({ success: true, message: "Message updated successfully", post: updatedPost });
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