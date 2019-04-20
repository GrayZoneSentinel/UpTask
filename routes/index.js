// Initial config
const express = require('express');
const router = express.Router();
// Import express validator
const { body } = require('express-validator/check');
// Imports main controllers
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
module.exports = function() {
    // ====== PROYECTOS =======
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
    // Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);
    // ====== TAREAS =======
    router.post('/proyectos/:url', tareasController.agregarTarea);
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    return router;
}