const express = require("express");

const app = express();
const admin = express();

app.set("view engine", "ejs");

app.locals.title = "Welcome to app object";

app.param("id", (req, res, next, id) => {
  const user = {
    id: id,
    name: "Avijit",
  };
  req.userDetails = user;
  next();
});

app.get("/", (req, res) => {
  res.render("pages/about");
});

app.get("/user/:id", (req, res) => {
  console.log(app.locals.title);
  console.log(req.userDetails.id);
  console.log(req.params.id);
  res.send("This is home page");
});

admin.param("userID", (req, res, next, userID) => {
  const guest = {
    userID: userID,
    name: "Guest User",
  };

  req.guestDetails = guest;
  next();
});

admin.get("/", (req, res) => {
  res.send("Welcome to adminPageHome");
});
admin.get("/guest/:userID", (req, res) => {
  console.log(req.guestDetails);
  res.send("Welcome to admin");
});

app.use("/admin", admin);

app.listen(3000, () => {
  console.log("listening at port 3000...");
});
