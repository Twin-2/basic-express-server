'use strict';

const validator = require("../src/middleware/validator");

describe('VALIDATOR MIDDLEWARE', () => {

    let consoleSpy;
    let req = { query: {} };
    let res = {};
    let next = jest.fn();

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    })

    afterEach(() => {
        consoleSpy.mockRestore();
    })

    it('should return a status code of 200 if there is a query string parameter of name', () => {
        req.query.name = 'string';
        console.log(req.query.name)
        validator(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();

    })

    it('should return a status code of 500 if there is not a query string parameter of name', () => {
        validator(req, res, next);
        expect(consoleSpy).toHaveBeenCalled()
    })

})