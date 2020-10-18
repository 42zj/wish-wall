const Sequelize = require('sequelize');
const db = require('../db');
const Wish = db.define(
  'Wish',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'wish',
  }
);

module.exports = Wish;
