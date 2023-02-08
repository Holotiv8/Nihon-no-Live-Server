'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Idol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Idol.belongsTo(models.Branch)
      Idol.hasMany(models.Favorite)
      Idol.hasMany(models.Products)
    }
  }
  Idol.init({
    spotifyId: DataTypes.STRING,
    youtubeId: DataTypes.STRING,
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    profileImage: DataTypes.TEXT,
    detailImage: DataTypes.TEXT,
    fanName: DataTypes.STRING,
    debut: DataTypes.STRING,
    birthday: DataTypes.STRING,
    height: DataTypes.STRING,
    illustrator: DataTypes.STRING,
    // color: { via, to }
    color: DataTypes.STRING,
    BranchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Idol',
  });
  return Idol;
};