const { User } = require("../models");
const midtransFunction = require("../helpers/payment");
const {sendEmailSubs} = require("../helpers/nodemailerSubs");

class PaymentController {
  static async paymentSubscribe(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (user.isSubscribed === true) {
        throw { name: "already_subscribed" };
      }

      sendEmailSubs(user.email);
      let midtransToken = await midtransFunction(user);
      res.status(200).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = PaymentController;
