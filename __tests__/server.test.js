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

    beforeAll(async () => {
        await db.sync();
    })

    afterAll(async () => {
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
    it('should respond to a GET route of /books/:id with a status of 200 and an object', () => {
        mockRequest.post('/books').send({ title: "test", author: "tester" })
            .then(results => {
                mockRequest.get(`/books/${results.id}`)
                    .then(results => {
                        expect(results.status).toBe(200)
                        expect(typeof results.body).toEqual('object')
                    })
            })
    })

    //test the update route
    it('should respond to a PUT route of /books/:id with a status of 202 and an object', () => {
        mockRequest.post('/books').send({ title: "test", author: "tester" })
            .then(results => {
                mockRequest.put(`/books/${results.id}`).send({ title: 'changed', author: 'changed' })
                    .then(results => {
                        expect(results.status).toBe(202)
                        expect(typeof results.body).toEqual('object')
                    })
            })
    })

    // test the delete route
    it('should respond to a DELETE route of /books/:id with a status of 204 and an object', () => {
        mockRequest.post('/books').send({ title: "test", author: "tester" })
            .then(results => {
                mockRequest.delete(`/books/${results.id}`)
                    .then(results => {
                        expect(results.status).toBe(204)
                        expect(typeof results.body).toEqual('object')
                    })
            })
    })
})

// describe('GAME ROUTES', () => {

//     beforeAll(async () => {
//         await db.sync();
//     })

//     afterAll(async () => {
//         await db.drop();
//     })

//     // test the post route
//     it('should respond to a POST route of /games with a status of 201 and an object', () => {
//         return mockRequest.post('/games').send({ title: "test", platform: "tester" })
//             .then(results => {
//                 expect(results.status).toBe(201)
//                 expect(typeof results.body).toEqual('object')
//             })
//     })

    //     //test the get all route
    //     it('should respond to a GET route of /games with a status of 200 and an object', () => {
    //         return mockRequest.post('/games').send({ title: "test", platform: "tester" })
    //             .then(results => {
    //                 mockRequest.get('/games')
    //                     .then(results => {
    //                         expect(results.status).toBe(200)
    //                         expect(typeof results.body).toEqual('object')
    //                     })
    //             })
    //     })

    //     //test the get one route
    //     it('should respond to a GET route of /games/:id with a status of 200 and an object', () => {
    //         return mockRequest.post('/games').send({ title: "test", platform: "tester" })
    //             .then(results => {
    //                 mockRequest.get(`/games/${results.id}`)
    //                     .then(results => {
    //                         expect(results.status).toBe(200)
    //                         expect(typeof results.body).toEqual('object')
    //                     })
    //             })
    //     })

    //     //test the update route
    //     it('should respond to a PUT route of /games/:id with a status of 202 and an object', () => {
    //         return mockRequest.post('/games').send({ title: "test", platform: "tester" })
    //             .then(results => {
    //                 mockRequest.put(`/games/${results.id}`).send({ title: 'changed', platform: 'changed' })
    //                     .then(results => {
    //                         expect(results.status).toBe(202)
    //                         expect(typeof results.body).toEqual('object')
    //                     })
    //             })
    //     })

    //test the delete route
    // it('should respond to a DELETE route of /games/:id with a status of 204 and an object', () => {
    //     return mockRequest.post('/games').send({ title: "test", platform: "tester" })
    //         .then(results => {
    //             mockRequest.delete(`/games/${results.id}`)
    //                 .then(results => {
    //                     expect(results.status).toBe(204)
    //                     expect(typeof results.body).toEqual('object')
    //                 })
    //         })
    // })
// })