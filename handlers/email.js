const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/mail');

// create reusable transporter object using the default SMTP transport
let transport = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    host: emailConfig.host,
    // port: 587,
    port: emailConfig.port,
    // secure: false, // true for 465, false for other ports
    auth: {
    //   user: testAccount.user, // generated ethereal user
    //   pass: testAccount.pass // generated ethereal password
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

// send mail with defined transport object
let mailOptions = {
    from: '"UpTask Services" <no-reply@uptask.com>', // sender address
    to: "uptask@uptask.com", // list of receivers
    subject: "UPTASK Recover password", // Subject line
    text: "New password", // plain text body
    html: "<b>Resetea tu clave de acceso</b>" // html body
};

transport.sendMail(mailOptions);