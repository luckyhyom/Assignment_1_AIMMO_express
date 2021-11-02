const express = require('express')
const app = express()
const { jwtMiddleware } = require('./libs/token')
const cors = require('cors')
const router = require('./router')
const mongoose = require('mongoose')
const port = process.env.PORT || 3013
const categoryCode = require('./Models/CategoryCode');

require('dotenv').config();
mongoURI = process.env.mongoURI;
const connect = mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Connected...')
    })
    .catch(err => console.log(err));
categoryCode.initial();
app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(jwtMiddleware)

app.use('/', router)

app.use((error, req, res, next)=> {
    console.log(error);
    switch(error.status){
        case 401:
            if(!error.message) error.message = 'Unauthorized';
            break;
        case 403:
            if(!error.message) error.message = 'Forbidden';
            break;
        case 404:
            if(!error.message) error.message = 'not found';
            break;
        default:
            error.status = 500;
            error.message = '서버에서 문제가 발생했습니다.';
    }
    res.status(error.status).json({
        success: false,
        message: error.message
    });
});
app.listen(port, function () {
    console.log(`Server Listening on ${port}`)
})