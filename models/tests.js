'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tests.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    questions: DataTypes.JSON,
    alternatives: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Tests',
  });
  return Tests;
};