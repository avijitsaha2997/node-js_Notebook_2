const express = require("express");
const multer = require("multer");

const app = express();

const UPLOADS_FOLDER = "./uploads";

// define the storage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, UPLOADS_FOLDER); // this callback func recieved a folder destination path as a second parameter
  },
  filename: (req, file, cb) => {
    function getFileExtension(filename) {
      const extension = filename.split(".").pop();
      return extension ? "." + extension : "";
    }
    const fileExt = getFileExtension(file.originalname);
    const filename =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("_") +
      "-" +
      Date.now();
    cb(null, filename + fileExt);
  },
});

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 8000000, // 1mb
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only jpg, jpeg and png format allowed"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only pdf format allowed"));
      }
    }
  },
});

// app.post("/", upload.single("avatar"), (req, res) => {
//   res.send("Home");
// });

// app.post("/", upload.array("avatar", 3), (req, res) => {
//   res.send("Home");
// });

app.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "doc", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send("Home");
  }
);

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was a problem in uploading!");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("Sucess");
  }
});

app.listen("3000", () => {
  console.log("App listening on http://localhost:3000");
});
