const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/about", (req, res) => {
  res.render("index", {
    name: "Avijit Saha",
  });
  // res.cookie("name", "AvijitSaha");
  res.end();
});

app.listen(3000, () => {
  console.log("listening at port 3000...");
});
