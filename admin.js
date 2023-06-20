const express = require("express");

const admin = express.Router();

admin.get("/profile", (req, res) => {
  console.log("This is the profile page of the admin.");
  res.send("Admin profile");
});

admin.get("/", (req, res) => {
  console.log("This is the main page of the admin.");
  res.send("Admin page");
});

module.exports = admin;
