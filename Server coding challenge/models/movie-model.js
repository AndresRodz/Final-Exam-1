const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    /*
        Your code goes here
    */
   getMovieByID: function(id) {
       return moviesCollection
            .find({movie_ID: id})
            .populate('actors', ['firstName', 'lastName'])
            .then(movie => {
                return movie;
            })
            .catch(err => {
                return err;
            });
   },
   removeActorFromMovieList: function(movieId, newActors) {
        return moviesCollection
            .findOneAndUpdate({movie_ID: movieId},
                {$set: {actors: newActors}})
            .populate('actors', ['firstName', 'lastName'])
            .then(movie => {
                return movie;
            })
            .catch(err => {
                return err;
            })
            
   }
}

module.exports = {
    Movies
};

