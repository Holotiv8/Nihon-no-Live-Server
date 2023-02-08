const { verifyToken } = require("../helpers");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token);
    if (!access_token) {
      throw { name: "Unauthorize" };
    }

    const payload = verifyToken(access_token);

    if (!payload) {
      throw { name: "JsonWebTokenError" };
    }

    const foundUser = await User.findByPk(payload.id);

    if (!foundUser) {
      throw { name: "Unauthorize" };
    }

    req.user = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      isSubscribed: foundUser.isSubscribed,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
