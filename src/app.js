if (process.env.USER) require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan)

module.exports = app;