'use strict';

const express = require('express');
const { Game } = require('../models/index.js');

const gameRoutes = express.Router();



const addGame = async (req, res) => {
    let game = await Game.create(req.body)
    res.status(201).json(game)
}

const getAllGames = async (req, res) => {
    let allGames = await Game.findAll();
    res.status(200).json(allGames)
}

const getOneGame = async (req, res) => {
    let id = Number(req.params.id);
    let game = await Game.findOne({ where: { id: id } })
    res.status(200).json(game)
}

const updateGame = async (req, res) => {
    let id = Number(req.params.id);
    let game = await Game.findOne({ where: { id: id } })
    let updatedGame = await game.updategame(req.body)
    res.status(202).json(updatedGame);
}

const deleteGame = async (req, res) => {
    let id = Number(req.params.id);
    let deletedGame = await Game.destroy({ where: { id: id } })
    res.send(204).send('deleted')
}

gameRoutes.post('/games', addGame)
gameRoutes.get('/games', getAllGames)
gameRoutes.get('/games/:id', getOneGame)
gameRoutes.put('/games/:id', updateGame)
gameRoutes.delete('/games/:id', deleteGame)

module.exports = gameRoutes;