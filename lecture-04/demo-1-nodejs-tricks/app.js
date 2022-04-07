let title = "This page"
let subtitle = "this is an example page"
let description = undefined

let html = "<html><body>" + 
           "<h1>" + title + "</h1>" +
           "<h2>" + subtitle + "</h2>" +
           "<p>" + description + "</p>" + 
           "</body></html>"

console.log(html)

let html2 = `
<html>
  <body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <p>${description ? description : ""}</p>
  </body>
</html>`
console.log(html2)


function descriptionHtml(description){
    if(description){
        return `<p>${description}</p>`
    } else{
        return ""
    }
}

let html3 = `
<html>
  <body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    ${descriptionHtml(description)}
  </body>
</html>`
console.log(html3)