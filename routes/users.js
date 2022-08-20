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

// Get all users
usersRouter.get('/getall', (req, res) => {
    console.log("GET request successful")

    console.log(userData)
    res.send(userData)
})

// Get single user by username
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

// Get user's watched list
usersRouter.get('/showuserwatchedlist/:username', async (req, res) => {
    console.log("GET request successful")

    //store title input and turn to uppercase
    let newString = req.params.username.toLowerCase()
    //store the resulting movie that matches the newString
    const queriedUser = await User.findOne({where: {username: newString}})
    
    if(!queriedUser.watched == 0){
        let {watched} = queriedUser
        let payload = {
            watched: watched
        }
        console.log(payload);
        res.send(payload)
    } else {
        console.log("This user has not watched any movies")
        res.send("This user has not watched any movies")
    }
})

// Put request to add a movie to a user's watched list
usersRouter.put('/addtowatchedlist/:username/:title', async (req, res) => {
    console.log("PUT request successful")

    //NEEDS AN IF STATEMENT HERE TO CHECK IF WATCHED LIST IS EMPTY OR NOT AND INCLUDE A COMMA IF NECESSARY.
    //ALSO NEEDS IFS TO CHECK IF USER OR TITLE WAS SUCCESSFULLY FOUND.

    let titleString = req.params.title.toUpperCase()
    const queriedMovie = await Movie.findOne({where: {title: titleString}})

    let usernameString = req.params.username.toLowerCase()
    const queriedUser = await User.findOne({where: {username: usernameString}})


    if(queriedUser == null){
        console.log("There are no registered users with that username.")
        res.send("There are no registered users with that username.")
        return
    } 

    if (queriedMovie == null) {
        console.log("Could not find a movie with that title.")
        res.send("Could not find a movie with that title.")
        return
    }

    if(queriedUser.watched == 0){
        await User.update({
            watched: queriedMovie.title
        }, {
            where: { username: req.params.username}
        })
        res.send("Watched list succesfully updated for user")
    } else {
        await User.update({
            watched: queriedUser.watched + ", " + queriedMovie.title
        }, {
            where: { username: req.params.username}
        })
        res.send("Watched list succesfully updated for user")
    }
    res.sendStatus(200)
})

module.exports = {usersRouter}