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

// Generar HTML
const generarHTML = (archivo, opciones = {}) => {
    // const html = pug.renderFile(`${__dirname}/../views/emails/restablecer-password.pug`);
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}

// send mail with defined transport object
exports.enviar = async (opciones) => {
    const html = generarHTML(opciones.archivo, opciones);
    const text = htmlToText.fromString(html);
    let opcionesEmail = {
        from: '"UpTask Services" <no-reply@uptask.com>', 
        // to: "uptask@uptask.com",
        to: opciones.usuario.email,
        // subject: "UPTASK Recover password",
        subject: opciones.subject,
        // text: "New password",
        text,
        // html: generarHTML()
        html
    };
    // Se emplea util porque sirve para aquellas cuestiones que no soportan Async - Await
    const enviarMail = util.promisify(transport.sendMail, transport);
    return enviarMail.call(transport, opcionesEmail);
    // transport.sendMail(mailOptions);
}
// let mailOptions = {
//     from: '"UpTask Services" <no-reply@uptask.com>', // sender address
//     to: "uptask@uptask.com", // list of receivers
//     subject: "UPTASK Recover password", // Subject line
//     text: "New password", // plain text body
//     html: generarHTML() // html body
// };

// transport.sendMail(mailOptions);