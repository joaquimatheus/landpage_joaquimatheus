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

const htmls = {
  index: fs.readFileSync(path.resolve(__dirname, 'public/index.html'))
}

app.use(express.static('./public/'))

app.get('/index', (req, res) => { res.end(htmls.index) })
app.get('/index.html', (req, res) => { res.end(htmls.index) })
app.get('/', (req, res) => { res.end(htmls.index) })

app.use(bodyParser.json())

app.post('/contact', async(req, res) => {
    const { headers } = req
    const userAgent = headers['user-agent'];
    const { email, name, msg, subject } = req.body

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
