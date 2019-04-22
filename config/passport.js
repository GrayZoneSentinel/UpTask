const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al Modelo en el que se prodece a la autenticación de usuarios
const Usuarios = require('../models/Usuarios');

// Local Strategy con autenticación mediante usuario y password propios
passport.use(
    new LocalStrategy(
        // Por defecto, passport, espera un email y una contraseña
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try{
                const usuario = await Usuarios.findOne(
                    { where: 
                        {email: email}
                    }
                )
                // Error: el usuario existe pero el password es incorrecto
                if(!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'La clave de acceso no es correcta.'
                    })
                }
                // Correcto: garantizar acceso a usuario con identificación y clave correctas
                return done(null, usuario);
            } catch (error) {
                // Error: el usuario no existe
                return done(null, false, {
                    message: 'Ninguna cuenta UpTask corresponde a ese usuario'
                })
            }
        }
    )
);
// REQUISITOS DE PASSPORT:
// 1.- Serializar usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
// 2.- Deserializar usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});
// EXPORTAR PASSPORT
module.exports = passport;