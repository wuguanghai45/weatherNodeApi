const express = require('express')
const app = express()
const weather = require("./src/weather");

app.get('/', function (req, res) {
  weather("温州", (string)=> {
    res.setHeader('Content-Type', 'text/plain');
    res.send(string);
  })
})

app.listen(process.env.PORT || 4000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 4000}`)
})
