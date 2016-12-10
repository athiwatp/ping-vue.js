var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var ping = require('ping')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
  next()
})
app.use(express.static('dist'))
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
// data store
var data = []

app.post('/ping', function (req, res) {
  let url = []
  url.push(req.body.url)
  url.forEach((url) => {
    ping.promise.probe(url).then((res) => {
      console.log(res)
      data.push(res)
    })
  })
  res.send('Success')
})

app.get('/api/ping', function (req, res) {
  res.send(data)
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
