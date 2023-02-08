const { Op } = require("sequelize");
const { Favorite, Branch, Idol } = require("../models");

class favoriteController {
  static async addFavoriteIdol(req, res, next) {
    try {
      let IdolId = req.params.IdolId;
      let findIdol = await Idol.findOne({
        where: { id: IdolId },
      });
      if (!findIdol) {
        throw { name: "Data Not Found" };
      }
      let UserId = req.user.id;
      let data = await Favorite.create({ IdolId, UserId });
      res.status(201).json({
        message: "Success Add Favorite Idol",
      });
    } catch (error) {
      next(error);
    }
  }
  static async favoriteIdolList(req, res, next) {
    const { filter } = req.query;
    let UserId = req.user.id;
    const paramQuerySQL = {
      include: [
        {
          model: Branch,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Favorite,
          where: { UserId },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          right: true,
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "asc"]],
    };

    if (filter !== "" && typeof filter !== "undefined") {
      const query = filter.branch.split(",").map((item) => ({
        [Op.eq]: item,
      }));

      paramQuerySQL.where = {
        BranchId: { [Op.or]: query },
      };
    }
    try {
      let data = await Idol.findAll(paramQuerySQL);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteFav(req, response, next) {
    try {
      const { IdolId } = req.params;

      let data = await Favorite.findOne({ where: { IdolId } });
      if (!data) {
        throw { name: "Data Not Found" };
      }
      await Favorite.destroy({ where: { IdolId } });
      response
        .status(200)
        .json({ message: "Success Delete Ur Talent From Favorite List" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = favoriteController;
