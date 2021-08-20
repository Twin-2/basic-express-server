'use strict';

const express = require('express');
const { Game } = require('../models/index.js');

const gameRoutes = express.Router();



const addGame = async (req, res, next) => {
    try {
        let game = await Game.create(req.body)
        res.status(201).json(game)
    } catch (err) {
        next(err)
    }
}

const getAllGames = async (req, res, next) => {
    try {
        let allGames = await Game.findAll();
        res.status(200).json(allGames)
    } catch (err) {
        next(err)
    }
}

const getOneGame = async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        let game = await Game.findOne({ where: { id: id } })
        res.status(200).json(game)
    } catch (err) {
        next(err)
    }
}

const updateGame = async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        let game = await Game.findOne({ where: { id: id } })
        let updatedGame = await game.update(req.body)
        res.status(202).json(updatedGame);
    } catch (err) {
        next(err)
    }
}

const deleteGame = async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        let deletedGame = await Game.destroy({ where: { id: id } })
        res.send(204).send(deletedGame)
    } catch (err) {
        next(err)
    }
}

gameRoutes.post('/games', addGame)
gameRoutes.get('/games', getAllGames)
gameRoutes.get('/games/:id', getOneGame)
gameRoutes.put('/games/:id', updateGame)
gameRoutes.delete('/games/:id', deleteGame)

module.exports = gameRoutes;