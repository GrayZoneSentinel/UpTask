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