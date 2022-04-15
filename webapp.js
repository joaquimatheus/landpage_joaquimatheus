require('./dotenv')
process.env.TZ = 'UTC'

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const htmls = {
  index: fs.readFileSync(path.resolve(__dirname, 'public/index.html'))
}

app.use(express.static('./public/'))

app.get('/index', (req, res) => { res.end(htmls.index) })
app.get('/index.html', (req, res) => { res.end(htmls.index) })
app.get('/', (req, res) => { res.end(htmls.index) })

app.post('/contact', (req, res) => {
    console.log(req.body)
})

app.listen(process.env.HTTP_PORT, () => {
  console.log('Is running ya')
})
