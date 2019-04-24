const Usuarios = require('../models/Usuarios');
// const flash = require('connect-flash');
const enviarMail = require('../handlers/email');
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
            // Crear una URL de confirmación de creación de nueva cuenta de usuario
            const confirmarURL = `http://${req.headers.host}/confirmar/${email}`;
            // Creación de un nuevo objeto de usuario
            const usuario = {
                email
            }
            // Enviar el email al potencial usuario
            await enviarMail.enviar({
                usuario,
                subject: 'Confirma tu cuenta UpTask',
                confirmarURL,
                archivo: 'confirmar-cuenta'
            });
            // Redirigir
            req.flash('correcto', 'Recibirás un correo electrónico para confirmar la creación de tu UpTask.')
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
exports.confirmarCuenta = async (req, res) => {
    // Cambia el estado de una cuenta
    // res.json(req.params.correo);
    const usuario = await Usuarios.findOne(
        {
            where : { email: req.params.correo}
        }
    );
    // Usuario fallido
    if(!usuario){
        req.flash('error', 'No válido');
        res.redirect('/crear-cuenta');
    }
    // Usuario creado correctamente
    usuario.activo = 1;
    await usuario.save();
    req.flash('correcto', 'Cuenta funcional y activa');
    res.redirect('/iniciar-sesion');
}
exports.formRestablecerPassword = (req, res) => {
    res.render('restablecer', {
        nombrePagina: 'Restablecer contraseña'
    })
}