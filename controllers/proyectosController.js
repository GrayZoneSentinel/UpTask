// Importar el modelo de Proyectos
const Proyectos = require('../models/Proyectos');
// Importar Slug to retrieve the Project's URL
const slug = require('slug');

exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'UPTASK - Proyectos'
    });
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevo-proyecto', {
        nombrePagina: 'UPTASK - Crear proyecto'
    });
}

// exports.nuevoProyecto = (req, res) => {
exports.nuevoProyecto = async (req, res) => {
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
            errores
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
