const {db} = require('.');
const {movieData, userData} = require('./seedData');
const {Movie, User} = require('../models');

let populateDataBase = async () => {
    await db.sync({ force: true });
    await Promise.all(movieData.map((c) => {Movie.create(c)}))
    await Promise.all(userData.map((c) => {User.create(c)}))
}

let buildDB = async () => {
    await populateDataBase()
}

buildDB()

module.exports = {buildDB}