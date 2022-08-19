const e = require('express')
const express = require('express')
const moviesRouter = express.Router()
const {check, validationResult} = require('express-validator')
const { restart } = require('nodemon')
const { movieData } = require('../db/seedData')
const {Movie} = require('../models/')

moviesRouter.get('/', (req, res) => {
    console.log('GET request successful')
    res.send('it works.')
})

// GET

// All movies
moviesRouter.get('/getall', (req, res) => {
    console.log("GET request successful")

    console.log(movieData)
    res.send(movieData)
})

// One movie
moviesRouter.get('/getmoviebytitle/:title', async (req, res) => {
    console.log("GET request successful")

    //store title input and turn to uppercase
    let newString = req.params.title.toUpperCase()
    //store the resulting movie that matches the newString
    const queriedMovie = await Movie.findOne({where: {title: newString}})

    //get values from queriedMovie and store in the theMovie
    let{title, genre, rating, director} = queriedMovie
    let theMovie = {
        title: title,
        genre: genre,
        rating: rating,
        director: director
    }

    console.log(theMovie)
    res.send(theMovie)
})

// Movies of a specific genre
moviesRouter.get('/getmoviesbygenre/:genre', async (req, res) => {
    console.log("GET request successful")

    //store the genre input and turn first character to upper case and the rest to lower
    let newString = req.params.genre[0].toUpperCase() + req.params.genre.slice(1).toLowerCase();
    
    //find all movies in that genre
    const queriedMovie = await Movie.findAll({where: {genre: newString}});

    //an array to store the found movies in
    let resultArray = [];

    //loop through each queried movie and push to the resultArray
    if (queriedMovie.length == 0){
        console.log("No films in that genre found in database.")
        res.send("No films in that genre found in database.")
    } else {
        for (let i = 0; i < queriedMovie.length; i++){
            console.log("test")
            let{title, genre, rating, director} = queriedMovie[i]
            let theMovie = {
                title: title,
                genre: genre,
                rating: rating,
                director: director
            }
            resultArray.push(theMovie);
        }
        console.log(resultArray)
        res.send(resultArray)
    }
})

//PUT

// Update movie rating
moviesRouter.put('/updaterating', async (req, res) => {
    console.log("PUT request successful")
    console.log(req.body)

    await Movie.update({
        rating: req.body.rating,
      }, {
        where: { title:req.body.title },
      })

    res.sendStatus(200)
})

// Update where to watch a movie (instead of update status)
moviesRouter.put('/updatewheretowatch', async (req, res) => {
    console.log("PUT request successful")

    console.log(req.body)

    await Movie.update({
        whereToWatch: req.body.whereToWatch,
      }, {
        where: { title:req.body.title },
      })

    res.sendStatus(200)
})

// Create movie and add to database
moviesRouter.post('/', async (req, res) => {
    console.log("POST request successful")
    let movieUpdate = req.body
    await Movie.create(req.body)
    console.log(movieUpdate)
    res.sendStatus(200)
})

// Delete a movie
moviesRouter.delete('/deletemovie/:title', async (req, res) => {
    console.log("DELETE request successful")

    let newString = req.params.title.toUpperCase()
    const queriedMovie = await Movie.findOne({where: {title: newString}})
    // console.log(queriedMovie)
    if (!queriedMovie == null){
        await queriedMovie.destroy()
        console.log("Movie deleted")
        res.send("Movie deleted")
    } else {
        console.log("Could not find a movie with that title.")
        res.sendStatus("Could not find a movie with that title.")
    }
        
})

module.exports = {moviesRouter}