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
        
    }
}
