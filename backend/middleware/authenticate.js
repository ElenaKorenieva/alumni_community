const jwt = require("jsonwebtoken");
const { HttpError } = require("../helper");
const { User } = require("../model/userModel");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized 1"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized 2"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized 3"));
  }
};

module.exports = authenticate;
