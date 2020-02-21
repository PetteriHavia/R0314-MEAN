var fs = require("fs");

var data = fs.readFileSync('example.txt');
var data2 = fs.readFileSync('example2.txt');

console.log(data.toString());
console.log(data2.toString());
console.log("Program Ended");