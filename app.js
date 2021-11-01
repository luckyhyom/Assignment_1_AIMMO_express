const express = require('express')
const app = express()
const { jwtMiddleware } = require('./libs/token')
const cors = require('cors')
const router = require('./router')
const mongoose = require('mongoose')
const port = process.env.PORT || 3013
require('dotenv').config();
mongoURI = process.env.mongoURI;
const connect = mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(jwtMiddleware)

app.use('/', router)

app.listen(port, function () {
    console.log(`Server Listening on ${port}`)
})