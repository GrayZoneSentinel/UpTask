const express = require('express');
// Importar el archivo de las rutas
const routes = require('./routes');
// Configurar PUG
const path = require('path');
// BodyParser
const bodyParser = require('body-parser');
// Habilitar Validator en toda la aplicación
const expressValidator = require('express-validator');
// Connect Flash
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// Passport: autenticación usuarios
const passport = require('./config/passport');
// Importar Helpers file
const helpers = require('./helpers');
// Conexión a la base de datos
const db = require('./config/db');
// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
db.sync()
        .then(()=>console.log('Data Base connection: status OK'))
        .catch(error => console.log(error));
// Crear aplicación de EXPRESS
const app = express();
// Carga de los archivos estáticos
app.use(express.static('public'));
// Habilitar PUG
app.set('view engine', 'pug');
// Habilitar bodyparser para ver lo que se escribe en el textfields
app.use(bodyParser.urlencoded({extended:true}));
// Validator para toda la aplicación
app.use(expressValidator());
//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));
// Habilitar Flash messages
app.use(flash());
// Cookie Parser necesario para la funcionalidad de Session
app.use(cookieParser());
// Navegación entre distintas páginas sin requerir nueva autenticación
app.use(session({
        secret: 'supersecreto',
        resave: false,
        saveUninitialized: false
        }
));
// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());
// APRENDIENDO MIDDLEWARE
// Pasar var dump a la aplicación
app.use((req, res, next)=>{
        res.locals.vardump = helpers.vardump;
        res.locals.mensajes = req.flash();
        res.locals.usuario = { ...req.user} || null;
        next();
});

app.use((req, res, next) =>{
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();  
})

// Configurar ruta acceso index
app.use('/', routes());
// Configurar puerto
app.listen(3000);