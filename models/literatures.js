const users = require("./users")
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class literatures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      literatures.belongsTo(models.users,{
        foreignKey : {
          name : "userId"
        }
      })
    }
  };
  literatures.init({
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    publication_date: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    ISBN: DataTypes.INTEGER,
    author: DataTypes.STRING,
    attache: DataTypes.STRING,
    status: DataTypes.STRING,
    isbnn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'literatures',
  });
  return literatures;
};