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

exports.nuevoProyecto = (req, res) => {
    res.send('Proyecto registrado correctamente')
}
