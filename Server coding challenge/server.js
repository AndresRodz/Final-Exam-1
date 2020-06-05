const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
const {Movies} = require('./models/movie-model');

const app = express();

/* 
    Your code goes here 
*/
app.patch('/api/delete-movie-actor/:movie_ID', (errorHandler, jsonParser), (req, res) => {

    let newActors = [];

    Movies
        .getMovieByID(paramMovieId)
        .then(movie => {
            if(!movie) {
                res.statusMessage = "The movie does not exist";
                res.status(404).end();
            }

            newActors = movie.actors;

            for(let i = 0; i < newActors.length; i++) {
                if(newActors[i].firstName == firstName && newActors[i],lastName == lastName) {
                    newActors.splice(i, 1);
                    break;
                }
            }

            Movies
                .removeActorFromMovieList(paramMovieId, newActors)
                .then(newMovie => {
                    return res.status(201).json(newMovie);
                })
                .catch(err => {
                    res.statusMessage = err;
                    return res.status(500).end();
                })
        })
        .catch(err => {
            res.statusMessage = err;
            return res.status(500).end();
        })
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});