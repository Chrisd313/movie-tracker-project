// const { Sequelize, DataTypes, db } = require('sequelize')

const {DataTypes, db} = require('../db')

const Movie = db.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING
  },
  genre: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.FLOAT
  },
  director: {
    type: DataTypes.STRING
  },
  whereToWatch: {
    type: DataTypes.STRING
  }
});

module.exports = {Movie};