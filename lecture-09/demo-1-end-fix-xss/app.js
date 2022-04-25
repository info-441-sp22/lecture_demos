import * as cheerio from 'cheerio'
import express from 'express'
const app = express()

// from: https://stackoverflow.com/questions/40263803/native-javascript-or-es6-way-to-encode-and-decode-html-entities
const escapeHTML = str => str.replace(/[&<>'"]/g, 
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));

const userInputWithHTML = "You <em>shouldn't</em> allow <strong>any</strong> html from users to be rendered as html."

function vulnerableAddUserInput(){
    let htmlString = `
    <p>
    <strong>Here is the user input:</strong> ${userInputWithHTML}
    </p>`
    return htmlString
}

function fixWithFunction(){
    let htmlString = `
    <p>
    <strong>Here is the user input:</strong> ${escapeHTML(userInputWithHTML)}
    </p>`
    return htmlString
}

function fixWithTextField(){
    let htmlString = `
    <p>
    <strong>Here is the user input:</strong><span id="userInput1"></span>
    </p>`

    // if I were in the browser, I could add html and then select
    // an element and add conent to it using the innerText property (instead of innerHTML)
    // document.getElementById('userInput1').innerText = userInputWithHTML

    let parsedHtml = cheerio.load(htmlString)
    parsedHtml("#userInput1").text(userInputWithHTML)

    return parsedHtml.html()
}


app.get('/', (req, res) => {
    res.send(`
    <html><body>
        <h1>Demo for xss escaping</h1>
        <h2>html with html injected (xss vulnerability)</h2>
        ${vulnerableAddUserInput()}
        <h2>fixed with function</h2>
        ${fixWithFunction()}
        <h2>fixed with Text field</h2>
        ${fixWithTextField()}
    </body></html>
    `)
})

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})
