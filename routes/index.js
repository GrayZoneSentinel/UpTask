// Initial config
const express = require('express');
const router = express.Router();
// Import express validator
const { body } = require('express-validator/check');
// Imports main controllers
const proyectosController = require('../controllers/proyectosController');
module.exports = function() {
    // Ruta para el Home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    // Listar proyectos
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    // Actualizar proyecto
    router.get('/proyectos/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);


    return router;
}