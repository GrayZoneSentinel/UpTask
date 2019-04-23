const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
//================================================
//         FUNCIONES DE LOS PROYECTOS
//================================================
// Autenticar usuario
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son oblicatorios'
});
// Check si el usuario está autenticado
exports.usuarioAutenticado = (req, res, next) => {
    // Usuario autenticado
    if(req.isAuthenticated()){
        return next();
    }
    // Usuario no autenticado
    return res.redirect('/iniciar-sesion');
}
// Cerrar sesión de usuario
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/iniciar-sesion');
    })
}
// Enviar token
exports.enviarToken = async (req, res) => {
    // Verificación existencia de Usuario
    const { email } = req.body;
    const usuario = await Usuarios.findOne({where: {email: email }});
    // Verificación de existencia de usuario negativa
    if(!usuario){
        req.flash('error', 'El email introducido no corresponde a ninguna cuenta UpTask');
        // res.render('restablecer', {
        //     nombrePagina: 'Restablecer contraseña',
        //     mensajes: req.flash()
        // })
        res.redirect('/restablecer');
    }
    // Verificación de existencia de usuario positiva
        // Generar Token
        // const token = crypto.randomBytes(20).toString('hex');
        // console.log('TOKEN: '+token);
    usuario.token = crypto.randomBytes(20).toString('hex');
        // Expiración Token
        // const expiracion = Date.now() + 3600000;
    usuario.expiracion = Date.now() + 3600000;
        // Guardado en la Base de Datos
    await usuario.save();
        // URL de reset
    const resetURL = `http://${req.headers.host}/restablecer/${usuario.token}`;
        // console.log(resetURL);
}
exports.resetPassword = async (req, res) => {
    // res.json(req.params.token);
    const usuario = await Usuarios.findOne({where: {token: req.params.token}});
    // Usuario no encontrado
    if(!usuario){
        req.flash('error', 'No válido');
        res.redirect('/restablecer');
    }
    // Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Restablecer clave de acceso'
    })
}