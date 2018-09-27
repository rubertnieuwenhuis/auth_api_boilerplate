const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const router = require('./router')
const keys = require('./config/keys')

// DB setup
mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true})

// App setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('server running on: ' + port)