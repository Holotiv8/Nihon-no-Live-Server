const { Idol, Branch } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
const spotifyFunction = require("../helpers/spotify");
const youtubeFunction  = require("../helpers/youtube");
const youtubeLiveFunction = require("../helpers/youtubeLive");

class IdolController {
  static async showAll(req, res, next) {
    const { filter } = req.query;
    const paramQuerySQL = {
      include: [
        {
          model: Branch,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "asc"]],
    };

    // filtering by category
    if (filter !== "" && typeof filter !== "undefined") {
      const query = filter.branch.split(",").map((item) => ({
        [Op.eq]: item,
      }));

      paramQuerySQL.where = {
        BranchId: { [Op.or]: query },
      };
    }
    try {
      const data = await Idol.findAll(paramQuerySQL);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async showIdolById(req, res, next) {
    try {
      let { id } = req.params;
      const data = await Idol.findOne({
        include: [
          {
            model: Branch,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: { id },
      });
      if (!data) {
        throw { name: "Data Not Found" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async showBranches(req, res, next) {
    try {
      const data = await Branch.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async idolSpotify(req, res, next) {
    let { spotifyId } = req.params;
    try {
      const songs = await spotifyFunction(spotifyId);
      res.status(200).json(songs);
    } catch (error) {
      next(error);
    }
  }
  static async idolYoutube(req, res, next) {
    let { youtubeId } = req.params;
    try {
      const videos = await youtubeFunction(youtubeId);
      res.status(200).json(videos);
    } catch (error) {
      next(error);
    }
  }
  static async idolLiveYoutube(req, res, next) {
    let { youtubeId } = req.params;

    try {
      const videos = await youtubeLiveFunction(youtubeId);
      res.status(200).json(videos);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = IdolController;
