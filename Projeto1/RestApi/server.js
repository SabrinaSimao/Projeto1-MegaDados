const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
// middleware to handle error
const errorMiddleware = require('./api/middlewares/error')
// this loads all controllers and routes
const routes = require('./api/controllers/index')
const boom = require('boom')
const database =  require('./api/models/database');

const app = express()
let port = 3002

if (config.has('PORT')) {
  port = config.get('PORT')
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(routes)

app.use((err, req, res, next) => {
  if (err.isServer) {
    console.log('Server error!')
    console.log(err)
  }

  if (boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload)
  }
  next(err)
})

app.use(errorMiddleware.handleError)

database.connect((err) => {
  if (err) throw err;
  console.log(' Database Connected!');
  app.listen(port);
})



module.exports = app
