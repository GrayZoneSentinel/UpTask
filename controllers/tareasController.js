// Importar el modelo de Proyectos
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
//================================================
//         FUNCIONES DE LAS TAREAS
//================================================
exports.agregarTarea = async (req, res, next) => {
    // res.send('Enviado');
    // Obtener el Proyecto al que pertenecerá la Tarea
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});
    // console.log(proyecto);
    // console.log(req.body);
    // Obtener el valor introducido en el input
    const { tarea } = req.body;
    // Estado 0 = incompleto, ID del proyecto
    const estado = 0;
    const proyectoId = proyecto.id;
    // Insertar registro de la Tarea en la Base de Datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId });
    if(!resultado){
        return next();
    }
    // Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}