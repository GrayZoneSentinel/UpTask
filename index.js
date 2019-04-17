const express = require('express');
// Importar el archivo de las rutas
const routes = require('./routes');
// Importar Helpers file
const helpers = require('./helpers');
// Conexión a la base de datos
const db = require('./config/db');
                    // db.authenticate().then(()=>console.log('Conectado a la base de datos correctamente')).catch(error => console.log(error));
require('./models/Proyectos');
db.sync()
        .then(()=>console.log('Data Base connection: status OK'))
        .catch(error => console.log(error));
// Configurar PUG
const path = require('path');
// BodyParser
const bodyParser = require('body-parser')
// Crear aplicación de EXPRESS
const app = express();
// Habilitar PUG
app.set('view engine', 'pug');
// Carga de los archivos estáticos
app.use(express.static('public'));
//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));
// Pasar var dump a la aplicación
app.use((req, res, next)=>{
        res.locals.vardump = helpers.vardump;
        next();
})
// APRENDIENDO MIDDLEWARE
app.use((req, res, next) =>{
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();  
})
// Habilitar bodyparser para ver lo que se escribe en el textfields
app.use(bodyParser.urlencoded({extended:true}));
// Configurar ruta acceso index
app.use('/', routes());
// Configurar puerto
app.listen(3000);