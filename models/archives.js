'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Archives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Archives.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    archive: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Archives',
  });
  return Archives;
};