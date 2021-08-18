'use strict';

const validator = (req, res, next) => {
    if (req.query.name) {
        console.log('valid query string')
        next();
    } else {
        console.log('route failed')
        next('missing query string parameter. This route needs a query string parameter of name')
    }
}


module.exports = validator;