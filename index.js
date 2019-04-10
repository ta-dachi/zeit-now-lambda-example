const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send(200, "<h1>Hello, world!</h1>");
});

app.get("/up", (req, res) => {
  res.sendFile(path.join(__dirname + "/up.html"));
});

app.post("/upload", function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // let sampleFile = req.files.sampleFile;
  console.log(req);
  // // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv("/somewhere/on/your/server/filename.jpg", function(err) {
  //   if (err) return res.status(500).send(err);

  //   res.send("File uploaded!");
  // });
});

module.exports = app;
