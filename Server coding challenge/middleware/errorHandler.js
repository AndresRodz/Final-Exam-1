const {Movies} = require('.././models/movie-model');
const {Actors} = require('.././models/actor-model');

function errorHandler(req, res, next) {
    /* 

        Your code goes here

    */
   let paramMovieId = req.params.movie_ID;
   let bodyMovieId = req.body.movie_ID;
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;

   if(!bodyMovieId) {
       res.statusMessage = "Id is missing in the body of the request";
       return res.status(406).end();
   }

   if(bodyMovieId != paramMovieId) {
       res.statusMessage = "Id and movie_ID do not match";
       return res.status(409).end();
   }

   if(!firstName || !lastName) {
       res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list";
       return res.status(403).end();
   }

   Movies
        .getMovieByID(paramMovieId)
        .then(movie => {
            if(!movie) {
                res.statusMessage = "The movie does not exist";
                res.status(404).end();
            }

            Actors
                .getActorByName(firstName, lastName)
                .then(actor => {
                    if(!actor) {
                        res.statusMessage = "The actor does not exist";
                        res.status(404).end();
                    }

                    next();
                    
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
}

module.exports = errorHandler;