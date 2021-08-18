'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const handleNotFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

app.use(cors());

app.get('/person', validator, (req, res) => {
    let name = req.query.name
    let data = { name: name }
    res.status(200).json(data)
})
app.use('*', logger, handleNotFound)
app.use(errorHandler)

module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => {
            console.log(`server up on ${port}`);
        })
    }
}