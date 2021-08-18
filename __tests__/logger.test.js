'use strict';

const logger = require("../src/middleware/logger");

describe('LOGGER MIDDLEWARE', () => {

    let consoleSpy;
    let req = {};
    let res = {};
    let next = jest.fn();

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    })

    afterEach(() => {
        consoleSpy.mockRestore();
    })

    it('should log the method and path from the reqest body', () => {
        logger(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();

    })

})