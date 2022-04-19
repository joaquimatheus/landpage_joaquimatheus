require('./dotenv.js');
const nodemailer = require('nodemailer');

async function sendEmail() {
    const transporter = nodemailer.createTransport({
        host: "",
        port: 587,
        secure: false,
        auth: {
            user: "",
            pass: "",
        },

        await transporter.sendMail({
            from,
            to,
            subject,
            text,
            from: 'contato <contato@joaquimatheus.site>'
        })
    });
}

module.exports = { sendEmail };
