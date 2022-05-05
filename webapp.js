require('./dotenv')
process.env.TZ = 'UTC'

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const environment = process.env.ENVRONMENT || 'development';
const knex = require('knex')(require('./knexfile')[environment]);

const { sendEmail } = require('./email');
const { saveMaliciousIPs } = require('./watches');

const htmls = {
    index: fs.readFileSync(path.resolve(__dirname, 'public/index.html')),
    errEmail: fs.readFileSync(path.resolve(__dirname, 'public/emailError.html')) 
}

app.use(express.static('./public/'))

app.get('/index', (req, res) => { res.end(htmls.index) })
app.get('/index.html', (req, res) => { res.end(htmls.index) })
app.get('/', (req, res) => { res.end(htmls.index) })
app.get('/mailerror', (req, res) => {res.end(htmls.errEmail)})

app.use(bodyParser.json())

const sendFormDataByIp = {}
app.post('/contact', async(req, res) => {
    const { ip, headers } = req
    const userAgent = headers['user-agent'];
    const { email, name, msg, subject } = req.body

    if (!sendFormDataByIp[ip]) { sendFormDataByIp[ip] = 0 };

    sendFormDataByIp[ip]++;
    console.log(sendFormDataByIp);
    if (sendFormDataByIp[ip] > 5) {
        await saveMaliciousIPs(email, ip, userAgent);
        return res.status(500).redirect('mailerror');
    };

    try {
        const sendUser = await knex('users').insert({
            name: name, 
            email: email, 
            msg: msg,
            subject: subject});
    } catch (ex) {
        console.error(ex)
        res.status(500).end('foi mal, mas algo deu errado. :/')
    }

    try {
        await sendEmail(email, subject, name, msg);
    } catch (ex) {
        console.error(ex);
    }
});

app.listen(process.env.HTTP_PORT, () => {
  console.log('Is running ya')
})
