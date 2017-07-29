const express = require('express')
const app = express()
const weather = require("./src/weather");

app.get('/', function (req, res) {
  if (!req.query['cityname']) {
    res.send("");
  } else {
    weather(req.query['cityname'], (string)=> {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
      res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      res.setHeader('Content-Type', 'text/plain');
      res.send(string);
    })
  }
})

app.listen(process.env.PORT || 4000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 4000}`)
})
