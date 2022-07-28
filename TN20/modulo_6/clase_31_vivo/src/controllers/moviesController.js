const db = require('../database/models');

const moviesController = {
    list: (req, res) => {
        db.Pelicula.findAll()
            .then((resultado) => {
                return res.render('moviesList', { movies: resultado });
            });
    },
    detail: (req, res) => {
        let id = req.params.id;

        db.Pelicula.findByPk(id)
            .then((resultado) => {
                return res.render('moviesDetail', { movie: resultado });
            });
    },
    new: (req, res) => {
        db.Pelicula.findAll({
                order: [
                    ['release_date', 'DESC']
                ]
            })
            .then(function(resultado) {
                return res.render('newestMovies', { movies: resultado });
            });
    },
    recomended: (req, res) => {
        db.Pelicula.findAll({
                order: [
                    ['rating', 'DESC']
                ],
                limit: 5
            })
            .then(function(respuesta) {
                return res.render('recommendedMovies', { movies: respuesta });
            });
    }
}

module.exports = moviesController;