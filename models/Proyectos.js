const Sequelize = require('sequelize');
// Ruta archivo de configuración de la base de datos
const db = require('../config/db');
// Crear el modelo
const Proyectos = db.define('proyectos', {
    id:{
        type: Sequelize.INTEGER,
        primeryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
});

module.exports = Proyectos;