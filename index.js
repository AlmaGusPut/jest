const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload');
dotenv.config()

const user=require('./src/routes/user');
const User = require('./src/models/user');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', (err) => {
    console.log('DB Estabilished');
})

const {
    APP_PORT
} = process.env
const app = express()

//logging everytime api is hit
app.all('*', function (req,res,next){
    console.log('INCOMING API HIT' )
    console.log('Time: ',new Date(Date.now()).toDateString() )
    console.log('Request URL : '+req.originalUrl )
    console.log('Request Method : '+req.method)
    next()
})

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//route list

app.use('/api',
 [user]
 )

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'Backend is running well'
    })
})


//error handling

//THIS HAS TO BE BELOW ANY OTHER ROUTES

app.use((req, res, next) =>{//endpoint error handling if no route found
    const err = new Error("Not Found")
    err.status=404
    next(err)
})
//this is error handler middleware
app.use((err,req, res, next) =>{
    res.status(err.status || 500)
    res.send({
        error : {
            status: err.status || 500,
            message : err.message
        }
    })
})

module.exports = app