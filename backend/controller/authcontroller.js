const { HttpError, ctrlWrapper } = require("../helper");
const { User } = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const registerUser = async (req, res) => {
  console.log(req.body);
  const { email, password, name, gitHub } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: "",
  });

  const { _id: id } = newUser;

  const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

  await User.findByIdAndUpdate(id, { token }, { new: true }).then((user) => {
    res.json({
      token: token,
      user: {
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        gitHub: user.gitHub,
      },
    });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await bcryptjs.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token }, { new: true }).then(
    (user) => {
      res.json({
        token: token,
        user: {
          name: user.name,
          email: user.email,
          avatarURL: user.avatarURL,
          gitHub: user.gitHub,
        },
      });
    }
  );
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  // console.log(req.headers);
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "Logout success",
  });
};

const updateProfileUser = async (req, res) => {
  const { _id: id, email } = req.user;
  const {
    email: newEmail,
    name: newName,
    password: newPassword,
    gitHub: newGitHub,
  } = req.body;

  const isEmailInUse = await User.findOne({ email: newEmail });
  if (email !== newEmail && isEmailInUse) throw HttpError(409, "Email in use");

  const userNewData = {
    email: newEmail,
    name: newName,
    gitHub: newGitHub,
  };

  if (newPassword) {
    userNewData.password = await bcryptjs.hash(newPassword, 10);
  }

  if (req.file) {
    userNewData.avatarURL = req.file.path;
  }

  const result = await User.findByIdAndUpdate(id, userNewData, {
    new: true,
  });
  if (!result) throw HttpError(404);

  res.json({
    name: result.name,
    email: result.email,
    avatarURL: result.avatarURL,
    gitHub: result.gitHub,
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateProfileUser: ctrlWrapper(updateProfileUser),
};
