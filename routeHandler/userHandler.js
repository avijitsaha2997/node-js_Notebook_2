const express = require("express");
const userSchema = require("../schemas/userSchema.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.model("User", userSchema);

const userHandler = express.Router();

// Sign Up
userHandler.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
      status: req.body.status,
    });
    res.status(200).send("Signup sucessfull. User saved");
  } catch (error) {
    res.status(500).send("Error sign up and saving user details");
  }
});

// Log in
userHandler.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user !== null) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        //generate token
        const token = jwt.sign(
          {
            username: user.username,
            userId: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: token,
          message: "Login sucessfull",
        });
      } else {
        res.status(500).send("Error login");
      }
    } else {
      res.status(500).send("Error login");
    }
  } catch (error) {
    res.status(500).send("Error login");
  }
});

module.exports = userHandler;
