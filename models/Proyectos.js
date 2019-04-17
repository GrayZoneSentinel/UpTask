const Sequelize = require('sequelize');
// Ruta archivo de configuración de la base de datos
const db = require('../config/db');
// Importar Slug to retrieve the Project's URL
const slug = require('slug');
// Importar ShortID
const shortid = require('shortid');
// Crear el modelo
const Proyectos = db.define('proyectos', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
}, {
    hooks: {
            // Introducción de Hooks para la URL del proyecto
            beforeCreate(proyecto){
            console.log('Before the insertion of the project -and the URL- in the DB'); 
            const url = slug(proyecto.nombre).toLowerCase();
            // Funcionalidad ShortId
            // proyecto.url = url;
            proyecto.url = `${url}-${shortid.generate()}`
            }
        }
    }
);

module.exports = Proyectos;