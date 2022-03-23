require('./dotenv')
process.env.TZ = 'UTC'

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/join/:email', (req, res) => {
  const { email } = req.params;
})

app.listen(process.env.HTTP_PORT, () => {
  console.log('Is running ya')
})

