// Importar el modelo de Proyectos
const Proyectos = require('../models/Proyectos');
// Importar Slug to retrieve the Project's URL
const slug = require('slug');

//================================================
//         FUNCIONES DE LOS PROYECTOS
//================================================
exports.proyectosHome = async (req, res) => {
    // Get los distintos proyectos
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'UPTASK - Proyectos ' + res.locals.year,
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevo-proyecto', {
        nombrePagina: 'UPTASK - Crear proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    // res.send('Proyecto registrado correctamente')
    // Recuperar lo que el usuario escribe en el textfield
    console.log(req.body)
    // Validar que hay datos en el input
    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Elige el nombre del proyecto'})
    }
    // Si hay errores
    if(errores.length > 0){
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay error
        // Insertar nombre del proyecto en la BD
        // Proyectos
        //     .create({ nombre });
            // .then( () => console.log('Project successfully created and inserted in the DB') )
            // .catch( error => console.log(error) );
        // Retrieve the Slug
        // console.log(slug(nombre));
        const url = slug(nombre).toLowerCase();
        // Introducción de Hooks para el URL del proyecto
        
        // const proyecto = await Proyectos.create({ nombre, url });
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}

// Proyectos por URL: listar proyectos en la sidebar izq
exports.proyectoPorUrl = async (req, res, next) => {
    // res.send('Listo');
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    if(!proyecto) return next();
    // Render a la vista
        // console.log(proyecto);
        // res.send('Proyecto sended OK');
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async (req, res, next) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    if(!proyecto) return next();
    res.render('nuevo-proyecto', {
        nombrePagina: 'Editar proyecto',
        proyecto,
        proyectos
    })
}