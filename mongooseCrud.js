const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler.js");

// express app initialization
const app = express();
app.use(express.json());

// databse connection with mongoose
mongoose
  .connect("mongodb://0.0.0.0/todos", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/todo", todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: err.message });
}

// app listener
app.listen(3000, () => {
  console.log("listening on port 3000");
});
