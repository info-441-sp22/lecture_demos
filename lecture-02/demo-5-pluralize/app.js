import fs from 'fs'
import express from 'express'
import pluralize from 'pluralize'
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

app.get('/index.js', async (req, res) => {
  res.type('js')
  let fileContents = await fs.promises.readFile("index.js")
  res.send(fileContents)
})

app.get('/pluralize', (req, res) => {
  let inputWord = req.query.word
  let pluralWord = pluralize(inputWord)
  res.type('txt')
  res.send(pluralWord)
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
