const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sesion = sequelize.define('Sesion', {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
  idHost: {
    type: DataTypes.TEXT,
  },
  quatity_wolfs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quatity_butcher: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  voting_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trivia_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Sesion;