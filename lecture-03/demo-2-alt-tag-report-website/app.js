import fs from 'fs'
import fetch from 'node-fetch'
import parser from 'node-html-parser'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.type('html')
    res.send(fs.readFileSync("index.html").toString())
})

app.get('/index.js', (req, res) => {
    res.type('js')
    res.send(fs.readFileSync("index.js").toString())
})

app.get('/api/auditurl', async (req, res) => {
    let url = req.query.url
    let response = await fetch(url)
    let pageText = await response.text()

    let htmlPage = parser.parse(pageText)
    let imgTags = htmlPage.querySelectorAll("img")

    let htmlReturn = ""

    for(let i = 0; i < imgTags.length; i++){
        let imgTag = imgTags[i];

        htmlReturn += "<h3>Image " + i + " info:</h3>"
        htmlReturn += "alt text: " + imgTag.attributes.alt + "<br>"
        htmlReturn += "img src: " + imgTag.attributes.src + "<br>"
        htmlReturn += "<img src='"+ url + imgTag.attributes.src+ "' />"
    }

    res.type("html")
    res.send(htmlReturn)
})


app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})

