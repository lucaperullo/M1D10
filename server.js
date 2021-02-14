const express = require("express");
const cors = require("cors");

const questionsRoute = require("./questions");
const scoresRoute = require("./scores");

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
server.use("/questions", questionsRoute);
server.use("/scores", scoresRoute);
server.use(badRequestHandler);
server.use(notFoundHandler);

server.use(forbiddenHandler);
server.use(unauthorizedHandler);
server.use(catchAllHandler);
server.listen(port, () => {
  console.log("server listening on port " + port);
});
