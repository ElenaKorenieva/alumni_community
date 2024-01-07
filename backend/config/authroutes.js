const express = require("express");
const { schemas } = require("../model/userModel");
const {
  validateBody,
  authenticate,
  upload,
} = require("../middleware/index.js");
const ctrl = require("../controller/authcontroller");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerUserSchema, "missing fields"),
  ctrl.registerUser
);

router.post(
  "/login",
  validateBody(schemas.loginUserSchema, "missing fields"),
  ctrl.loginUser
);

router.post("/logout", authenticate, ctrl.logoutUser);

router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.updateProfileSchema),
  ctrl.updateProfileUser
);

module.exports = router;
