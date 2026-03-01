const fs = require("fs");

fetch("http://localhost:8000/foo/bar/bigfile.txt", {
  method: "PUT",
  body: fs.createReadStream("bigfile.txt"),
  duplex: "half"
}).then(() => {
    console.log("File uploaded successfully");
}).catch((error) => {
    console.error("Error uploading file:", error);
});