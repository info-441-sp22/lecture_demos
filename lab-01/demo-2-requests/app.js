// TO DO: Get the path of the url passed in
// TO DO: Get the query parameters of the url passed in
// TO DO: Get the url of the request
const express = require('express');
const app = express();

app.get('*', (req, res) => {
    console.log(req.url);
    res.send('you request the url: ' + req.url);
})

app.listen(3000, () => {
    console.log('example running on port 3000')
})
