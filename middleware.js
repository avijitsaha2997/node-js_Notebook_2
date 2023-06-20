const express = require("express");

const app = express();
const adminRouter = express.Router();

// const logger = (req, res, next) => {
//   console.log(
//     `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
//       req.originalUrl
//     } - ${req.protocol} - ${req.ip}`
//   );
//   throw new Error("this is an error");
// };

const loggerWrapper = (options) => {
  return function (req, res, next) {
    if (options.log) {
      console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
          req.originalUrl
        } - ${req.protocol} - ${req.ip}`
      );
      next();
    } else {
      throw new Error("There is an error");
    }
  };
};

const errorMiddleware = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("There was an error processing");
};

// adminRouter.use(logger);
adminRouter.use(loggerWrapper({ log: true }));
adminRouter.use(errorMiddleware);

app.use("/admin", adminRouter);
adminRouter.get("/dashboard", (req, res) => {
  res.send("Dashboard");
});

app.get("/about", (req, res) => {
  console.log("AboutPage");
  res.send("About");
});

app.get("/profile", (req, res) => {
  console.log("Profile Page");
  res.send("Profile Page");
});

app.listen("3000", () => {
  console.log("App listening on http://localhost:3000");
});
