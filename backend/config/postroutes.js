const express = require("express");
const router = express.Router()
const controller = require('../controller/postcontroller')
const { validateBody, authenticate, upload } = require("../middleware");

router.get("/", authenticate, controller.getPostsByTopic);
router.post("/", authenticate, controller.createNewPost);

module.exports = router;