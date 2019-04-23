const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
// Configuración mailing
const enviarMail = require('../handlers/email');
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
        // Enviar el correo al usuario con el token para restablecer clave de acceso
        await enviarMail.enviar({
            usuario,
            subject: 'Restablecer clave de acceso',
            resetURL,
            archivo: 'restablecer-password'
        });
        // Redireccionar
        req.flash('correcto', 'En unos instantes recibirás un correo con el enlace que te permita cambiar tu clave UpTask');
        res.redirect('/iniciar-sesion');
}
exports.validarToken = async (req, res) => {
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
exports.actualizarPassword = async (req, res) => {
    // console.log(req.params.token);
    const usuario = await Usuarios.findOne(
        {where: {
                token: req.params.token,
                expiracion: { [Op.gte] : Date.now() }
                }
        }
    );
    // Verificación de existencia del usuario
        // console.log(usuario);
        // Verificación negativa
            if(!usuario){
                req.flash('error', 'No válido');
                res.redirect('/restablecer');
            }
        // Verificación positiva
            // Hash new password
            usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            // Limpiar token y expiración
            usuario.token = null;
            usuario.expiracion = null;
            // Guardar el nuevo password
            await usuario.save();
            // Notificación de éxito
            req.flash('correcto', 'La clave de acceso se ha modificado satisfactoriamente.');
            res.redirect('/iniciar-sesion');
}