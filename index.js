const express = require('express');
// Importar el archivo de las rutas
const routes = require('./routes');

// Crear aplicación de EXPRESS
const app = express();
// Configurar ruta acceso index
app.use('/', routes());
// Configurar puerto
app.listen(3000);