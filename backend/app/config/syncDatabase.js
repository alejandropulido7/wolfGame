const sequelize = require('./db');
const Sesion = require('../models/sesion');
const Player = require('../models/player');
const SessionPlayers = require('../models/sessionPlayers');

async function syncDatabase() {
    try {
      await sequelize.sync(); // Usa force: true para recrear las tablas en cada reinicio (¡ten cuidado en producción!)
      console.log('Tables sync successfully');
    } catch (error) {
      console.error('Error to sync tables:', error);
    }
  }

module.exports = syncDatabase;