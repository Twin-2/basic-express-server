'use strict';

const Book = (sequelize, DataTypes) => sequelize.define('Books', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
    }
});

module.exports = Book;