var fs = require("fs");

var data = fs.readFileSync("example.txt");
var data2 = fs.readFileSync("example2.txt");

let data3 = data + data2;

fs.writeFile("combined.txt", data3, function(err) {
  if (err) throw err;
  console.log("OK");
});

fs.appendFile("combined.txt", "\nI wrote this!\n", function(err) {
  if (err) throw err;
  console.log("OK2");
});
