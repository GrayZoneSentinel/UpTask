// Initial config
const express = require('express');
const router = express.Router();

// Import express validator
const { body } = require('express-validator/check');

// Imports main controllers
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function() {

    // ====== PROYECTOS =======
    // Ruta para el Home
    router.get('/', authController.usuarioAutenticado, proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', authController.usuarioAutenticado, proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    // Listar proyectos
    router.get('/proyectos/:url', authController.usuarioAutenticado, proyectosController.proyectoPorUrl);
    // Actualizar proyecto
    router.get('/proyectos/editar/:id', authController.usuarioAutenticado, proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);
    // Eliminar proyecto
    router.delete('/proyectos/:url', authController.usuarioAutenticado, proyectosController.eliminarProyecto);
    
    // ====== TAREAS =======
    router.post('/proyectos/:url', authController.usuarioAutenticado, tareasController.agregarTarea);
    router.patch('/tareas/:id', authController.usuarioAutenticado, tareasController.cambiarEstadoTarea);
    router.delete('/tareas/:id', authController.usuarioAutenticado, tareasController.eliminarTarea);

    // ====== USUARIOS =======
    // Creación de una nueva cuenta de usuario
    router.get('/crear-cuenta', usuariosController.formCrearNuevaCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    // Autenticación usuarios
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    // Cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);
    // Recuperar contraseña
    router.get('/restablecer', usuariosController.formRestablecerPassword);
    router.post('/restablecer', authController.enviarToken);
    router.get('/restablecer/:token', authController.validarToken);
    router.post('/restablecer/:token', authController.actualizarPassword);
    
    
    return router;
}