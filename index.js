// start your server here
const express = require("express");

const server = express();
//require('./api/server.js');

const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`listening on ${port}`));
