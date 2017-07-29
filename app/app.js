const express = require('express')
const app = express()
const weather = require("./src/weather");
const https = require("https");
const fs = require("fs");

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

https.createServer({
  key: fs.readFileSync('2_beifengchuihan.vip.key'),
  cert: fs.readFileSync('1_beifengchuihan.vip_bundle.crt')
}, app).listen(process.env.HTTPS_PORT || 5000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 5000}`)
})

app.listen(process.env.PORT || 4000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 4000}`)
})
