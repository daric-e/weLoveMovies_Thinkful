const service = require('./reviews.service');
const hasProperties = require('../Errors/hasProperties');
const asyncErrorBoundary = require('../Errors/asyncErrorBoundary');

const hasRequiredProperties = hasProperties('content' || 'score');

const VALID_PROPERTIES = [
    'review_id',
    'content',
    'score',
    'created_at',
    'updated_at',
    'critic_id',
    'movie_id',
    'critic',
];

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
    const invalidFields = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
    );
if (invalidFields.length) {
    return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
        });
    }
    next();
}

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
    return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
}

async function list(req, res) {
    res.json({ data: await service.list(req.params.movieId) });
}

async function update(req, res) {
    const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
    };
    service.update(updatedReview);
    let data = await service.list(res.locals.review.movie_id);
    data = data.find(item => item.review_id === updatedReview.review_id);
    res.json({ data });
}

async function destroy(req, res) {
    await service.destroy(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    update: [asyncErrorBoundary(reviewExists), hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}