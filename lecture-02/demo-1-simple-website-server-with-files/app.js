const fs = require('fs')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.type('html')
  let fileContents = fs.readFileSync("index.html")
  res.send(fileContents)
})

app.get('/style.css', (req, res) => {
  res.type('css')
  let fileContents = fs.readFileSync("style.css")
  res.send(fileContents)
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
