require('./dotenv.js');
const nodemailer = require('nodemailer');

async function sendEmail(from, subject, name, msg) {
    const transporter = nodemailer.createTransport({
        host: process.env.AWS_SES_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.AWS_SES_USER,
            pass: process.env.AWS_SES_PASSWORD
        }
    });
    
    let info = await transporter.sendMail({
        from: from,
        to: 'matheus@joaquimatheus.site',
        subject: `${name}: ${subject}`,
        text: msg
    })

    console.log('Message ID', info.messageId);
}

module.exports = { sendEmail };
