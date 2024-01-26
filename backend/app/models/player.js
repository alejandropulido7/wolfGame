const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  games_win: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  max_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  wolf_times: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  butcher_times: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Player;