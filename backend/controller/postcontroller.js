const { default: mongoose } = require("mongoose");
const { ctrlWrapper } = require("../helper");
const multer = require('multer');
const path = require('path');

const Post = require('../model/Post')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getPostsByTopic = async (req, res) => {
  try {
    let query = {};

    if (req.params.topic) {
      query.topic = req.query.topic;
    }
    if (req.query.user) {
      query.user = req.query.user;
    }

    let sortOrder = 1;

    if (req.query.order && req.query.order.toUpperCase() === 'DESC') {
      sortOrder = -1;
    }

    let limitValue = parseInt(req.query.limit, 10) || 0;

    limitValue = Math.max(limitValue, 0);

    const options = {
      sort: { create_at: sortOrder },
      limit: limitValue,
    };

    const posts = await Post.find(query, null, options);

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createNewPost = async (req, res) => {
  try {
    const post = new Post({
      topic: req.body.topic,
      user: req.user.name,
      title: req.body.title,
      message: req.body.message
    });

    if (req.file) {
      const imageBuffer = req.file.buffer;

      post.image = {
        data: imageBuffer,
        contentType: req.file.mimetype
      };
    }
    await post.save();

    res
      .status(201)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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

    await post.deleteOne();
    return res.status(204).json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editMessage = async (req, res) => {

  console.log('aqui');
  const messageId = req.params.id;
  const postId = new mongoose.Types.ObjectId(messageId);
  const user = req.user.name;

  const { title, message } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    if (post.user !== user) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot edit this post" });
    }

    post.title = title
    post.message = message

    const updatedPost = await post.save();


    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addComment = async (req, res) => {
  const messageId = req.params.id;
  const postId = new mongoose.Types.ObjectId(messageId);
  const user = req.user.name;
  const { message } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ success: false, message: "Message is mandatory" });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const commentId = new mongoose.Types.ObjectId();

    post.comments.push({
      _id: commentId,
      text: message,
      user: user,
      createdAt: new Date(),
    });

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const removeComment = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.idComment;
  const user = req.user.name;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const commentToRemove = post.comments.find(comment => comment._id == commentId);
    if (!commentToRemove) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (commentToRemove.user !== user) {
      return res.status(403).json({ success: false, message: "You can not remove this comment" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ success: true, message: 'Comment removed successfully', post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const editComment = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.idComment;
  const { message } = req.body;
  const user = req.user.name;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const commentToUpdate = post.comments.find(comment => comment._id == commentId);

    if (!commentToUpdate) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (commentToUpdate.user !== user) {
      return res.status(403).json({ success: false, message: "You can not edit this comment" });
    }

    commentToUpdate.text = message;

    const updatedPost = await post.save();

    res.status(200).json({ success: true, message: 'Comment updated successfully', post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getPostsByTopic: ctrlWrapper(getPostsByTopic),
  createNewPost: ctrlWrapper(createNewPost),
  deletePost: ctrlWrapper(deletePost),
  editMessage: ctrlWrapper(editMessage),
  addComment: ctrlWrapper(addComment),
  removeComment: ctrlWrapper(removeComment),
  editComment: ctrlWrapper(editComment),
};
