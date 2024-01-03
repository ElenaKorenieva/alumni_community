const express = require("express");
const { schemas } = require("../model/userModel");
const ctrl = require("../controller/authcontroller");
const { validateBody, authenticate, upload } = require("../middleware");
// const { authenticate, upload, validateBody } = require("../middleware");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(schemas.registerUserSchema, "missing fields"),
  ctrl.registerUser
);

router.post(
  "/users/login",
  validateBody(schemas.loginUserSchema, "missing fields"),
  ctrl.loginUser
);

router.post("/users/logout", authenticate, ctrl.logoutUser);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/update",
  authenticate,
  //   upload.single("avatar"),
  validateBody(schemas.updateProfileSchema),
  ctrl.updateProfileUser
);

module.exports = router;
