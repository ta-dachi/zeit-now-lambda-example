require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
app.use(fileUpload());
app.use(express.json());
app.set("view engine", "ejs");

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views/up"), { URL: process.env.URL });
});

app.post("/post", function(request, response) {
  response.send({ yousaid: request.body });
});

app.post("/upload", function(req, res) {
  if (req.files === null) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  } else {
    return res.status(200).send("GOOD!");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // let sampleFile = req.files.sampleFile;

  // // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv("/somewhere/on/your/server/filename.jpg", function(err) {
  //   if (err) return res.status(500).send(err);

  //   res.send("File uploaded!");
  // });
});

module.exports = app;
