'use strict'

// Vendor
let bodyParser = require('body-parser')
let cfenv = require('cfenv')
let express = require('express')
let cors = require('cors')
let mongoose = require('mongoose')
let config = require('./app.config')()
let User = require('./user.model')

// Mongo DB Connection 
// mongoose.connect('mongodb://admin:passw0rd@ds061681.mlab.com:61681/fnoldb',
//     {}, (err) => (err) ? console.log(err) : console.log('Connected to database...'))
let mongoConnectionString = process.env.MONGO_DB || config.env.MONGO_DB
mongoose.connect(mongoConnectionString,
    {}, (err) => (err) ? console.log(err) : console.log('Connected to database...'))

// express server
let app = express()

// Parse incoming request as JSON.
app.use(bodyParser.urlencoded({ extended: false, keepExtensions: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())

// API Router
let api = express.Router()

api.post('/user', (req, res) => {
    console.log(req.body)
    let user = new User(req.body)

    user.save((err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
})

api.get('/user', (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
})

app.use('/api', api)

// get the app environment from Cloud Foundry
let appEnv = cfenv.getAppEnv();

app.listen(config.env.PORT, '0.0.0.0', () => {
    // print a message when the server starts listening
    console.log("server starting on " + config.env.PORT);
})