var fs = require("fs");

fs.mkdir("newdata/", { recursive: true }, err => {
  if (err) throw err;
  console.log("Ok");
});

fs.writeFile(
  "newdata/testFile.txt",
  "This file is inside the newdata folder",
  function(err) {
    if (err) throw err;
  }
);
