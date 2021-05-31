const express = require('express');
const path = require('path');

const api = express();

// Middleware
api.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
api.use('/', express.static('index.html'));

module.exports = api;