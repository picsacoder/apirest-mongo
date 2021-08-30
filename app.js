const express = require('express');
const body_parser = require('body-parser')

var app = express();

//Routes
var usr_router = require('./routes/usr');

//Body parser

app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

//CORS

//Routes confg
app.use('/api', usr_router);

module.exports = app;