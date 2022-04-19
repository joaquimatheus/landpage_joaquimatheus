require('./dotenv.js');
const nodemailer = require('nodemailer');

async function sendEmail() {
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
        from: '',
        to: '',
        subject: 'Hello =)',
        text: "llololololololololololo"
    })

    console.log('Message ID', info.messageId);
}

sendEmail().catch(console.error);

module.exports = { sendEmail };
