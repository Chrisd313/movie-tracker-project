// const {buildDB} = require('./db/populateDataBase')
const express = require("express");
const { Movie, User } = require("./models");
const {moviesRouter} = require('./routes')
const {usersRouter} = require('./routes')
const app = express();
const port = 7272;

//TO DO
//CREATE A POST REQUEST TO ADD NEW USER (not necessary but would be nice)
//EXPRESS VALIDATOR


app.use((req,res,next) => {
    console.log('Incoming request')
    next()
})

app.use(express.json())
app.use('/movies', moviesRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.send("Hello World!");
});



// app.get('/movies', (req, res) => {
//     console.log(movieData)
//     res.sendStatus(200);
// })

app.listen(port, () => {
    console.log('App is listening at http://localhost:7272');
});

// // GET ROUTES

// // All users
// app.get('/users/getall', async(req, res) => {
//     //res.send('Successful request to ALL USERS')
//     res.send(userData)
// })

// // One user
// app.get('users/getone/:id', async(req, res) => {
//     const id = req.params.id-1;

//     if (userData[id] == undefined){
//         res.send('Undefined user')
//     } else {
//         console.log(userData[id])
//         res.send(userData[id])
//     }
// })

// // Movies watched by one user
// app.get('/getuserwatchlist/:id', async(req, res) => {
//     const id = req.params.id-1;


// })



// All movies

// One movie

// Movies of a specific genre


// PUT ROUTES

// Update the status of a movie

// Update the rating of a movie

// Update to add a movie if a users watched it

// DELETE ROUTES

// One movie