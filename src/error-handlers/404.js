'use strict';

function handleNotFound(req, res, next) {
    const errorObject = {
        status: 404,
        messege: 'route not found'
    }
    res.status(404).send(errorObject);
}


module.exports = handleNotFound;