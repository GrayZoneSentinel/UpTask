// Importar el modelo de Proyectos
const Proyectos = require('../models/Proyectos');
// Importar Slug to retrieve the Project's URL
const slug = require('slug');
// Modelo Tareas
const Tareas = require('../models/Tareas');

//================================================
//         FUNCIONES DE LOS PROYECTOS
//================================================
exports.proyectosHome = async (req, res) => {
    // Auth user check
    console.log(res.locals.usuario);
    // Get los distintos proyectos
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos ' + res.locals.year,
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevo-proyecto', {
        nombrePagina: 'Crear proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Elige el nombre del proyecto'})
    }

    if(errores.length > 0){
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo proyecto',
            errores,
            proyectos
        })
    } else {
        // Búsqueda del ID del usuario para asignar el proyecto al usuario correspondiente
        const usuarioId = res.locals.usuario.id;  
        const url = slug(nombre).toLowerCase();
        const proyecto = await Proyectos.create({ nombre, usuarioId });
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
    // Consulta de las Tareas pertenecientes al Proyecto
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        // include: [
        //     { model: Proyectos }
        // ]
    })

    if(!proyecto) return next();
    // Render a la vista
        // console.log(proyecto);
        // res.send('Proyecto sended OK');
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    res.render('nuevo-proyecto', {
        nombrePagina: 'Editar proyecto',
        proyecto,
        proyectos
    })
}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Elige el nombre del proyecto'})
    }

    if(errores.length > 0){
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo proyecto',
            errores,
            proyectos
        })
    } else {   
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id }}
        );
        res.redirect('/');
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    const { urlProyecto } = req.query;
    const resultado = await Proyectos.destroy({where: {url: urlProyecto}});
    if(!resultado){
        return next();
    }
    res.status(200).send('Proyecto eliminado satisfactoriamente');

}