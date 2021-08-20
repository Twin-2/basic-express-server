'use strict';

const express = require('express');
const { Book } = require('../models/index.js');

const bookRoutes = express.Router();



const addBook = async (req, res, next) => {
    try {
        let book = await Book.create(req.body)
        res.status(201).json(book)
    } catch (err) {
        next(err)
    }
}

const getAllBooks = async (req, res, next) => {
    try {
        let allBooks = await Book.findAll();
        res.status(200).json(allBooks)
    } catch (err) {
        next(err)
    }
}

const getOneBook = async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        let book = await Book.findOne({ where: { id: id } })
        res.status(200).json(book)
    } catch (err) {
        next(err)
    }
}

const updateBook = async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        let book = await Book.findOne({ where: { id: id } });
        let updatedBook = await book.update(req.body)
        res.status(202).json(updatedBook);
    } catch (err) {
        next(err)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let deletedBook = await Book.destroy({ where: { id: id } })
        res.send(204).send('deleted')
    } catch (err) {
        next(err)
    }
}

bookRoutes.post('/books', addBook)
bookRoutes.get('/books', getAllBooks)
bookRoutes.get('/books/:id', getOneBook)
bookRoutes.put('/books/:id', updateBook)
bookRoutes.delete('/books/:id', deleteBook)

module.exports = bookRoutes;