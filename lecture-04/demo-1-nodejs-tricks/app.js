//Template strings demo

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


// Iterators Demo
let arr = [
    "first name : Kyle",
    "last name : Thayer",
    "age : 38",
    "glasses : yes"
]

// "forEach" runs a function on each item in an object/array
// we use it to extract the values into an object
let values = {}
arr.forEach(item => {
    let split_item = item.split(" : ")
    values[split_item[0]] = split_item[1]
})
console.log(values)

// "map" creates a modified version of an array
//    it makes a new array, where the result is running a function
//    item in the old array

// "map" demo 1: replace the ":" with "=" in the original array (arr)
let modifiedArr = arr.map(item =>{
    return item.replace(":", "=")
})
console.log(modifiedArr)

// "map" demo 2: get just the first part of the items in the array
let modifiedArr2 = arr.map(item => {
    return item.split(" : ")[0]
})
console.log(modifiedArr2)

// Note: with "map" you could take an array of values, and 
// return an array of html that has those values in it

// "filter" it goes through an array and makes a new array 
// with only some of the old items. You provide "filter" with a function
// and it keeps the items where the function returns true, and tosses out
// the items where the function returns false.
let filteredArr = arr.filter(item => {
    if(item.includes("name")) {
        return true
    } else {
        return false
    }
})
console.log(filteredArr)