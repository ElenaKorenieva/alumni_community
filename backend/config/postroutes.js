const express = require("express");
const router = express.Router()
const controller = require('../controller/postcontroller')
const multer = require('multer');
const { validateBody, authenticate } = require("../middleware");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", authenticate, controller.getPostsByTopic);
router.post("/", authenticate, upload.single('file'), controller.createNewPost);
router.delete("/:id", authenticate, controller.deletePost);
router.put("/:id", authenticate, controller.editMessage);
router.put("/:id/comment", authenticate, controller.addComment);
router.delete("/:id/comment/:idComment", authenticate, controller.removeComment);
router.put("/:id/comment/:idComment", authenticate, controller.editComment);
router.get("/user-posts", authenticate, controller.getUsersPosts);

module.exports = router;