const router = require('express').Router({ mergeParams: true });
const controller = require('./reviews.controller');
const methodNotAllowed = require('../Errors/methodNotAllowed');

router
    .route('/:reviewId')
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;