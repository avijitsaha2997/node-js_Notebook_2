const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler.js");
const userHandler = require("./routeHandler/userHandler.js");
const dotenv = require("dotenv");
// express app initialization
const app = express();
dotenv.config();
app.use(express.json());

// databse connection with mongoose
mongoose
  .connect("mongodb://0.0.0.0/todos", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/todo", todoHandler);
app.use("/user", userHandler);

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: err });
}

app.use(errorHandler);

// app listener
app.listen(3000, () => {
  console.log("listening on port 3000");
});
