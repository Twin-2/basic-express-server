'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const handleNotFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const bookRoutes = require('./routes/books.js')
const gameRoutes = require('./routes/games.js')


app.use(cors());
app.use(express.json());

app.use(bookRoutes);
app.use(gameRoutes);

app.use('*', handleNotFound)
app.use(errorHandler)

module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => {
            console.log(`server up on ${port}`);
        })
    }
}