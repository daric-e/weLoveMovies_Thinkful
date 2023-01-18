if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require('cors');

const notFound = require('./Errors/notFound');
const errorHandler = require('./Errors/errorHandler');

const moviesRouter = require('./Movies/movies.router');
const reviewsRouter = require('./Reviews/reviews.router');
const theatersRouter = require('./Theaters/theaters.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
