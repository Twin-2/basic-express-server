'use strict';

const server = require('./src/server.js');
const PORT = process.env.PORT
const { db } = require('./src/models/index.js')


db.sync()
    .then(() => {
        server.start(PORT)
    })