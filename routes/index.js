const express = require('express');
const router = express.Router();

module.exports = function() {
    // Ruta para el Home
    router.get('/', (req, res) =>{
        res.send('Home index');
    });
    router.get('/nosotros', (req, res) =>{
        res.send('Nosotros');
    });
    return router;
}