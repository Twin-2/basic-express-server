'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('API SERVER', () => {

    it('should return a 404 error on a bad route', () => {
        return mockRequest.get('/no-such-route')
            .then(results => {
                expect(results.status).toBe(404)
            })
    })

    it('should return a 404 error on a bad method, only current method is get', () => {
        return mockRequest.put('/person')
            .then(results => {
                expect(results.status).toBe(404)
            })
    })

    it('should return a 500 status if there is no query string parameter of name', () => {
        return mockRequest.get('/person')
            .then(results => {
                expect(results.status).toBe(500);
            })
    })

    it('should return a 200 status if there is no query string parameter of name', () => {
        return mockRequest.get('/person?name=anything')
            .then(results => {
                expect(results.status).toBe(200);
            })
    })

    it('should respond to a GET request of /person that contains a query parameter of name with an object', () => {
        return mockRequest.get('/person?name=anything')
            .then(results => {
                expect(typeof results.body).toEqual('object')
            })
    })

})