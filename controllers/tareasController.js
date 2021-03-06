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

exports.cambiarEstadoTarea = async (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    const tarea = await Tareas.findOne({where: {id: id}});
    // console.log(tarea);
    let estado = 0;
    if(tarea.estado === estado) {
        estado = 1;
    };
    tarea.estado = estado;
    const resultado = await tarea.save();
    if(!resultado) return next();
    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res)=>{
    // res.send('Eliminado...');
    const { id } = req.params;
    const resultado = await Tareas.destroy({ where: {id: id}});
    if(!resultado) return next();
    res.status(200).send('La tarea ha sido eliminada.');
}