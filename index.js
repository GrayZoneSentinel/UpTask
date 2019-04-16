const express = require('express');
// Importar el archivo de las rutas
const routes = require('./routes');
// Configurar PUG
const path = require('path');

// Crear aplicación de EXPRESS
const app = express();
// Habilitar PUG
app.set('view engine', 'pug');
// Carga de los archivos estáticos
app.use(express.static('public'));
//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));
// Configurar ruta acceso index
app.use('/', routes());
// Configurar puerto
app.listen(3000);