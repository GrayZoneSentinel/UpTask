const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    // nombre: Sequelize.STRING(100),
    // apellidos: Sequelize.STRING(100),
    email: {
        type: Sequelize.STRING(120),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false
    },

});
// Relation with Projects
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;