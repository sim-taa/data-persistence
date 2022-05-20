// build your server here and require it from index.js

const express = require('express');

//const fruitsRouter = require('./fruits/fruits-router.js');

const server = express();

server.use(express.json());

server.use('/api/resource/router', projectsRouter);

module.exports = server;

