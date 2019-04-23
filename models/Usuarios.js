const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido'
            },
            notEmpty: {
                msg: 'Dirección de correo requerida'
            }
        },
        unique: {
            args: true,
            msg: 'El email introducido ya figura registrado'
        }
    },
    password: {
        type: Sequelize.STRING(80),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password requerido'
            }
        }
    },
    activo: {
        type: Sequelize.INTEGER,
        defaultValue: 0    
    },
    token: Sequelize.STRING(80),
    expiracion: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }   
    }
})
//============================
//   MÉTODOS PERSONALIZADOS
//============================
// Validación de acceso: usuario registrado (function: verificarPassword() localizada en passport.js)
Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// Relation with Projects
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;