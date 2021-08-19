'use strict';

const Game = (sequelize, DataTypes) => sequelize.define('Games', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    platform: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
    }
});

module.exports = Game;