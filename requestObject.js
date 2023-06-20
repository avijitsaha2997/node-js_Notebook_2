const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/user/:id", (req, res) => {
  res.send("Hello World");
});

app.post("/user", (req, res) => {
  console.log(req.body.name);
  console.log(req.cookies);
  res.send("User post page");
});

app.listen(3000, () => {
  console.log("app listening on 3000 port");
});
