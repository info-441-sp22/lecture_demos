const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World! This is a very simple website!')
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
