const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, `.env.${process.env.ENVIRONMENT}`) //.env.dev .denv.prod
});
const port = process.env.PORT || 3000;
const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");

const app = express();
const maxSize = 2 * 1024 * 1024;

app.use(
  fileUpload({
    limits: { fileSize: maxSize },
    safeFileNames: true,
    createParentPath: true,
    preserveExtension: 3,
    abortOnLimit: true
  })
);
app.use(express.json());
app.use(helmet());
app.set("view engine", "ejs");

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
  console.log(`> Ready On Server http://${process.env.URL}`);
});

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views/up"), {
    URL: process.env.URL,
    maxSize: maxSize
  });
});

app.post("/upload", function(req, res) {
  if (req.files === null) {
    return res.status(400).send("No files were uploaded.");
  }
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log(req.files);
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let fileToUpload = req.files.fileToUpload;

  // Use the mv() method to place the file somewhere on your server
  const f = path.join(__dirname, `/files/${fileToUpload.name}`);
  fileToUpload.mv(f, function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

module.exports = app;
