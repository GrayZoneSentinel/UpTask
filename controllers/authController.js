const passport = require('passport');
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