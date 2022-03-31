import fs from 'fs'
import express from 'express'
const app = express()

app.get('/', async (req, res) => {
  res.type('html')
  let fileContents = await fs.promises.readFile("index.html")
  res.send(fileContents)
})

app.get('/style.css', async (req, res) => {
  res.type('css')
  let fileContents = await fs.promises.readFile("style.css")
  res.send(fileContents)
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
