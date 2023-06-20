const express = require("express");
const admin = require("./admin");
const guest = require("./guest");
const app = express();

app.get("/", (req, res) => {
  console.log("This is the main page.");
  res.send("Main page");
});
app.get("/user", (req, res) => {
  console.log("This is the user page.");
  res.send("User page");
});

app.use("/admin", admin);
app.use("/guest", guest);

app.listen(3002, () => {
  console.log("The app is listening on 3002 port..");
});
