if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require('cors');

const notFound = require('src/errors/notFound');
const errorHandler = require('src/errors/errorHandler');

const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
