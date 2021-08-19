'use strict';

const express = require('express');
const { Book } = require('../models/index.js');

const bookRoutes = express.Router();



const addBook = async (req, res) => {
    let book = await Book.create(req.body)
    res.status(201).json(book)
}

const getAllBooks = async (req, res) => {
    let allBooks = await Book.findAll();
    res.status(200).json(allBooks)
}

const getOneBook = async (req, res) => {
    let id = Number(req.params.id);
    let book = await Book.findOne({ where: { id: id } })
    res.status(200).json(book)
}

const updateBook = async (req, res) => {
    let id = Number(req.params.id);
    let book = await Book.findOne({ where: { id: id } })
    let updatedBook = await book.updateBook(req.body)
    res.status(202).json(updatedBook);
}

const deleteBook = async (req, res) => {
    let id = parseInt(req.params.id);
    console.log(req.params.id);
    let deletedBook = await Book.destroy({ where: { id: id } })
    res.send(204).send('deleted')
}

bookRoutes.post('/books', addBook)
bookRoutes.get('/books', getAllBooks)
bookRoutes.get('/books/:id', getOneBook)
bookRoutes.put('/books/:id', updateBook)
bookRoutes.delete('/books/:id', deleteBook)

module.exports = bookRoutes;