// Initial config
const express = require('express');
const router = express.Router();
// Imports main controllers
const proyectosController = require('../controllers/proyectosController');

module.exports = function() {
    // Ruta para el Home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);
    return router;
}