const express = require("express");

const guest = express.Router();

const log = (req, res, next) => {
  console.log("Something is logging..");
  next();
};

guest.use("/profile", log);

// guest.param("user", (req, res, next, id) => {
//   req.userID = id === "1" ? "Admin" : "Guest";
//   next();
// });

guest.param((param, inputData) => (req, res, next, id) => {
  if (id === inputData) {
    next();
  } else {
    res.sendStatus(403);
  }
});

guest.param("user", "11");

guest.get("/", (req, res) => {
  console.log(`This is the main page of the guest.`);
  res.send("guest page");
});

guest.get("/:user", (req, res) => {
  console.log(`Hello admin`);
  res.send("guest page");
});

guest.get("/profile", (req, res) => {
  console.log("This is the profile page of the guest.");
  res.send("guest profile");
});

module.exports = guest;
