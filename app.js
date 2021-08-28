const express = require('express');
const body_parser = require('body-parser')

var app = express();

//Routes


//Body parser

app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

//CORS

//Routes confg
app.get('/test-api/', (req, res) => {
    res.status(200).send(
        {
            message: 'Ruta de prueba'
        }
    )
})

module.exports = app;