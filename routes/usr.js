const express = require('express');
const controller = require('../controllers/usr');

var api = express.Router();

api.post('/register', controller.create_user)
api.post('/login', controller.login)

module.exports = api;