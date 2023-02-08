const { User } = require("../models");
const { comparePassword, createToken } = require("../helpers");
const randString = require("../helpers/randomString");
const {sendEmail}  = require("../helpers/nodemailer");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const uniqueString = randString();
      const isValid = false;
      const user = new User({
        username,
        email,
        password,
        uniqueString,
        isValid,
      });
      await user.save();
      sendEmail(email, uniqueString);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async verify(req, res, next) {
    try {
      const { uniqueString } = req.params;
      const user = await User.findOne({ where: { uniqueString } });
      if (!user) {
        throw { name: "Not Found" };
      }
      user.isValid = true;
      await user.save();
      res.redirect("https://youtube.com");
      res.status(200).json({ message: "Success Register" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidCredentials" };
      }

      const validatePassword = comparePassword(password, user.password);
      if (!validatePassword) {
        throw { name: "InvalidCredentials" };
      }

      if (user.isValid === false) {
        throw { name: "Not Verify" };
      }

      let payload = { id: user.id };
      const access_token = createToken(payload);
      res.status(200).json({ access_token, username: user.username, isSubscribed: user.isSubscribed, role: user.role });
    } catch (error) {
      next(error);
    }
  }

  static async subscribe(req, res, next) {
    try {
      const { id } = req.user;
      await User.update(
        {
          isSubscribed: true,
        },
        { where: { id } }
      );
      res.status(200).json({ message: "Success updated status" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
