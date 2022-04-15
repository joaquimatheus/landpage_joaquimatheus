require('./dotenv')
process.env.TZ = 'UTC'

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

const htmls = {
  index: fs.readFileSync(path.resolve(__dirname, 'public/index.html'))
}

app.use(express.static('./public/'))

app.get('/index', (req, res) => { res.end(htmls.index) })
app.get('/index.html', (req, res) => { res.end(htmls.index) })
app.get('/', (req, res) => { res.end(htmls.index) })

app.get('/send/:name-:msg-:email'), (req, res) => {
    const { name, msg, email } = req.params;
    console.log(`${name}, ${email}, ${msg} `)
}

app.listen(process.env.HTTP_PORT, () => {
  console.log('Is running ya')
})

