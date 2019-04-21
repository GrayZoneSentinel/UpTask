const Usuarios = require('../models/Usuarios');
//================================================
//         FUNCIONES DE USUARIOS
//================================================
exports.formCrearNuevaCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear nueva cuenta UpTask'
    });
}
exports.crearCuenta = (req, res) => {
    // res.send('Formulario enviado correctamente.');
    // Leer datos
        // console.log(req.body);
        const { email, password } = req.body;
        // Crear usuario
        Usuarios.create({
            email,
            password
        })
        .then(()=>{
            res.redirect('/iniciar-sesion');
        })
        // res.render('crearCuenta', {
        //     nombrePagina: 'Crear nueva cuenta'
        // })
}