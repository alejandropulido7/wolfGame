const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Sesion = require('./sesion');
const Player = require('./player');

const SessionPlayers = sequelize.define('SessionPlayers', {
    id: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    score_game: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role_game: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status_game: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

SessionPlayers.belongsTo(Sesion, {foreignKey: 'id_session'});

module.exports = SessionPlayers;