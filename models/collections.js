const literatures = require("./literatures")
const users = require("./users")
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      collections.belongsTo(models.literatures,{
        foreignKey : {
          name : "literatureId"
        }
      })
      collections.belongsTo(models.users,{
        foreignKey : {
          name : "userId"
        }
      })
    }
  };
  collections.init({
    literatureId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'collections',
  });
  return collections;
};