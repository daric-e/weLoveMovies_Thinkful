const router = require('express').Router();
const controller = require('./movies.controller');
const reviewsRouter = require('../Reviews/reviews.router');
const theatersRouter = require('../Theaters/theaters.router');
const methodNotAllowed = require('../Errors/methodNotAllowed');

router
    .use('/:movieId/reviews', controller.movieExists, reviewsRouter);

router
    .use('/:movieId/theaters', controller.movieExists, theatersRouter);

router
    .route('/:movieId')
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;