'use strict';

const express = require('express');
const { Game } = require('../models/index.js');
const Collection = require('../models/collection-class.js');
const gameRoutes = express.Router();

const Games = new Collection(Game);

gameRoutes.post('/games', async (req, res, next) => {
    let game = await Games.create(req.body)
    res.status(201).send(game)
})
gameRoutes.get('/games', async (req, res, next) => {
    let game = await Games.read()
    res.status(200).send(game)
})
gameRoutes.get('/games/:id', async (req, res, next) => {
    let game = await Games.read(req.params.id)
    res.status(200).send(game)
})
gameRoutes.put('/games/:id', async (req, res, next) => {
    let game = await Games.update(req.params.id, req.body)
    res.status(202).send(game)
})
gameRoutes.delete('/games/:id', async (req, res, next) => {
    let game = await Games.delete(req.params.id)
    res.status(204).send(game)
})

module.exports = gameRoutes;