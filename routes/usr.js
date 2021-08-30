const express = require('express');
const controller = require('../controllers/usr');

var api = express.Router();

api.get('/test', controller.pruebas);
api.post('/register', controller.create_user)

module.exports = api;