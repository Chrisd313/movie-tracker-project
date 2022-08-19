const express = require('express')
const usersRouter = express.Router()
const {check, validationResult} = require('express-validator')
const { userData } = require('../db/seedData')
const { movieData } = require('../db/seedData')
const {User, Movie} = require('../models/')

usersRouter.get('/', (req, res) => {
    console.log('GET request successful')
    res.send('it works.')
})

usersRouter.get('/getall', (req, res) => {
    console.log("GET request successful")

    console.log(userData)
    res.send(userData)
})

usersRouter.get('/findbyusername/:username', async (req, res) => {
    console.log("GET request successful")

    //store title input and turn to uppercase
    let newString = req.params.username.toLowerCase()
    //store the resulting movie that matches the newString
    const queriedUser = await User.findOne({where: {username: newString}})
    
    if(!queriedUser == null){
        let{username, email, watched} = queriedUser
        let theUser = {
            username: username,
            email: email,
            watched: watched
        }
        console.log(theUser);
        res.send(theUser)
    } else {
        console.log("There are no registered users with that username.")
        res.send("There are no registered users with that username.")
    }
})

usersRouter.put('/addtowatchedlist/:username/:title', async (req, res) => {
    console.log("PUT request successful")

    //NEEDS AN IF STATEMENT HERE TO CHECK IF WATCHED LIST IS EMPTY OR NOT AND INCLUDE A COMMA IF NECESSARY.
    //ALSO NEEDS IFS TO CHECK IF USER OR TITLE WAS SUCCESSFULLY FOUND.

    let titleString = req.params.title.toUpperCase()
    const queriedMovie = await Movie.findOne({where: {title: titleString}})

    let usernameString = req.params.username.toLowerCase()
    const queriedUser = await User.findOne({where: {username: usernameString}})

    console.log(queriedMovie.title)

    await User.update({
        watched: ", " + queriedMovie.title
    }, {
        where: { username: req.params.username}
    })
    
    res.sendStatus(200)
})

module.exports = {usersRouter}