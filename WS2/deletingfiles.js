var fs = require("fs");

fs.unlink("combined.txt", err => {
  if (err) throw err;
  console.log("combined.js file was deleted!");
});
