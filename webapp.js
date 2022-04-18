require('./dotenv')
process.env.TZ = 'UTC'

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

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
    const { email, name, msg } = req.body

    console.log(email, name, msg);
    console.log(headers);
    console.log(userAgent);
})

app.listen(process.env.HTTP_PORT, () => {
  console.log('Is running ya')
})
