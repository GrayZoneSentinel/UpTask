const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('UpTaskNode', 'root', 'rootroot', {
  //   host: 'localhost',
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
  operatorAliases: false,
  define: {
      timestamps:false
  },

  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
});