'use strict';

const server = require('./src/server.js');
const PORT = process.env.PORT

server.start(PORT)