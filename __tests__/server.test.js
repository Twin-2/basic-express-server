'use strict';

require('dotenv').config();
const { server } = require('../src/server.js');
const supertest = require('supertest');
const { db } = require('../src/models/index.js');
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

})

describe('BOOK ROUTES', () => {

    beforeEach(async () => {
        await db.sync();
    })

    afterEach(async () => {
        await db.drop();
    })

    //test the post route
    it('should respond to a POST route of /books with a status of 201 and an object', () => {
        return mockRequest.post('/books').send({ title: "test", author: "tester" })
            .then(results => {
                expect(results.status).toBe(201)
                expect(typeof results.body).toEqual('object')
            })
    })

    //test the get all route
    it('should respond to a GET route of /books with a status of 200 and an object', () => {
        mockRequest.post('/books').send({ title: "test", author: "tester" })
            .then(results => {
                mockRequest.get('/books')
                    .then(results => {
                        expect(results.status).toBe(200)
                        expect(typeof results.body).toEqual('object')
                    })
            })
    })

    //test the get one route
    it('should respond to a GET route of /books/:id with a status of 200 and an object', async () => {
        let results = await mockRequest.post('/books').send({ title: "test", author: "tester" })
        let updatedResults = await mockRequest.get(`/books/1`)
        expect(updatedResults.status).toBe(200)
        expect(typeof updatedResults.body).toEqual('object')

    })

    //test the update route
    it('should respond to a PUT route of /books/:id with a status of 202 and an object', async () => {
        let results = await mockRequest.post('/books').send({ title: "test", author: "tester" })
        let updatedResults = await mockRequest.put(`/books/${results.body.id}`).send({ title: "changed", author: "changed" })
        expect(updatedResults.status).toBe(202)
        expect(typeof updatedResults.body).toEqual('object')
    })

    // test the delete route
    it('should respond to a DELETE route of /books/:id with a status of 204', (done) => {
        mockRequest.post('/books').send({ title: "test", author: "tester" })
            .then(results => {
                mockRequest.delete(`/books/${results.body.id}`)
                    .then(results => {
                        expect(results.status).toBe(204)
                        done();
                    })
            })
    })
})

describe('GAME ROUTES', () => {

    beforeEach(async () => {
        await db.sync();
    })

    afterEach(async () => {
        await db.drop();
    })

    // test the post route
    it('should respond to a POST route of /games with a status of 201 and an object', async () => {
        let results = await mockRequest.post('/games').send({ title: "test", platform: "tester" })
        expect(results.status).toBe(201)
        expect(typeof results.body).toEqual('object')

    })

    //test the get all route
    it('should respond to a GET route of /games with a status of 200 and an object', async () => {
        let results = await mockRequest.post('/games').send({ title: "test", platform: "tester" })
        let request = await mockRequest.get('/games')
        expect(request.status).toBe(200)
        expect(typeof request.body).toEqual('object')

    })

    //test the get one route
    it('should respond to a GET route of /games/:id with a status of 200 and an object', async () => {
        let results = await mockRequest.post('/games').send({ title: "test", platform: "tester" })
        let search = await mockRequest.get(`/games/${results.body.id}`)
        expect(search.status).toBe(200)
        expect(typeof search.body).toEqual('object')

    })

    //test the update route
    it('should respond to a PUT route of /games/:id with a status of 202 and an object', async () => {
        let create = await mockRequest.post('/games').send({ title: "test", platform: "tester" })
        let results = await mockRequest.put(`/games/${create.body.id}`).send({ title: 'changed', platform: 'changed' })
        expect(results.status).toBe(202)
        expect(typeof results.body).toEqual('object')

    })

    // test the delete route
    it('should respond to a DELETE route of /games/:id with a status of 204 and an object', async () => {
        let results = await mockRequest.post('/games').send({ title: "test", platform: "tester" })
        let deleted = await mockRequest.delete(`/games/${results.body.id}`)
        expect(deleted.status).toBe(204)
        expect(typeof deleted.body).toEqual('object')

    })
})