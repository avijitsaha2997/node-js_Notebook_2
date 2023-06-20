const express = require("express");

const app = express();

const router = express.Router(); // for making routes
app.use(router);
app.use(express.static(`${__dirname}/public`, { index: "home.html" })); // for make a static folder
app.use(express.static(`${__dirname}/public`)); // for make a static folder
app.use(express.json()); // for aceesing a application/json response
app.use(express.text()); // for aceesing a text/plain response
app.use(express.raw()); // for aceesing a application/octet-stream response
app.use(express.urlencoded()); // for aceesing a application/x-www-form-urlencoded response

router.get("/", (req, res) => {
  res.send("Hello Express!");
});

router.post("/", (req, res) => {
  res.send("Post Method!");
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
