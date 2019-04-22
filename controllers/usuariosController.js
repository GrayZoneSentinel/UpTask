const Usuarios = require('../models/Usuarios');
// const flash = require('connect-flash');
//================================================
//         FUNCIONES DE USUARIOS
//================================================
exports.formCrearNuevaCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear nueva cuenta UpTask'
    });
}
exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar sesión en mi cuenta UpTask',
        error: error
    });
}
exports.crearCuenta = async (req, res) => {
    // res.send('Formulario enviado correctamente.');
    // Leer datos
        // console.log(req.body);
        const { email, password } = req.body;
        try{
            // Crear usuario
            await Usuarios.create({
                email,
                password
            });  
            res.redirect('/iniciar-sesion');
        } catch (error) {
            // console.log(error);
            req.flash('error', error.errors.map(error => error.message));
            res.render('crearCuenta', {
                // errores: error.errors,
                mensajes: req.flash(),  
                nombrePagina: 'Crear nueva cuenta UpTask',
                email: email,
                password: password
            })
        }
}