const express = require("express");
const cors = require("cors");

const questions = require("./questions");
const scores = require("./scores");

const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} = require("./errorHandling");

const server = express();

const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());
