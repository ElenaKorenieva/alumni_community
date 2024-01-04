const { HttpError, ctrlWrapper } = require("../helper");

const Posts = require('../model/Posts')

Posts.find()
    .then(result => {
        result.forEach(element => {
            console.log(element)
        })
    })
    .catch(err => console.log(err))

const getPostsByTopic = (req, res) => {
    console.log(req);
    Posts.findById({ _id: req.params.id })
        .then(result => {
            console.log(result)
            res.render('', { result })
        })
        .catch(err => console.log(err))
}

const createNewPost = (req, res) => {
    console.log(req.body)
    const post = new Post(req.body)
    post.save()
}

const editPost = (req, res) => {
    Posts.findById({ _id: req.params.id })
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
}



const deletePost = (req, res) => {
    const messageId = req.params.id;
    Posts.findByIdAndDelete(messageId)
        .then(result => {
            if (!result) {
                return res.status(404).send("Message not found");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error");
        });
};

const editMessage = (req, res) => {
    const messageId = req.params.id;
    const { name, message } = req.body;

    Posts.findById(messageId)
        .then(post => {
            if (!post) {
                return res.status(404).send("Message not found");
            }
            post.message = message;
            return post.save();
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error");
        });
};

module.exports = {
    getPostsByTopic: ctrlWrapper(getPostsByTopic),
    createNewPost: ctrlWrapper(createNewPost)
}