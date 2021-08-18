'use strict';

let errorHandler = (err, req, res, next) => {
    const errorObject = {
        status: 500,
        messege: err
    }
    res.status(500).send(errorObject);
}


module.exports = errorHandler;