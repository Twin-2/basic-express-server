'use strict';

const express = require('express');
const { Book } = require('../models/index.js');
const Collection = require('../models/collection-class.js');
const bookRoutes = express.Router();

const Books = new Collection(Book);



bookRoutes.post('/books', async (req, res, next) => {
    let book = await Books.create(req.body)
    res.status(201).send(book)
})
bookRoutes.get('/books', async (req, res, next) => {
    let book = await Books.read()
    res.status(200).send(book)
})
bookRoutes.get('/books/:id', async (req, res, next) => {
    let book = await Books.read(req.params.id)
    res.status(200).send(book)
})
bookRoutes.put('/books/:id', async (req, res, next) => {
    let book = await Books.update(req.params.id, req.body)
    res.status(202).send(book)
})
bookRoutes.delete('/books/:id', async (req, res, next) => {
    let book = await Books.delete(req.params.id)
    res.status(204).send(book)
})

module.exports = bookRoutes;