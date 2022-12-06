// TODO: Implementación de mecanismo de configuración de alertas
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.GOOGLE_ACCOUNT, // generated ethereal user
        pass: process.env.GOOGLE_KEY, // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log("Ready for send emails");
});

module.exports = { transporter };
