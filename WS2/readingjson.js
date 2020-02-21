var http = require("http");
var fs = require("fs");

http.createServer(function(request,response) {
    response.writeHead(200, {"Conten-Type": "text/json"});
    var data = fs.readFileSync("sampledata.json");
    var json = JSON.parse(data); //Parse to JS object
    var newData = {name: 'John Doe', age: '52', company: 'Laurea', address: 'Ratatie 22'};
    json.push(newData);
    fs.writeFileSync('dataset.json', JSON.stringify(json)); //Convert to String
    json.splice(json.length-1);
    response.write(JSON.stringify(json)); // Show data
    response.end();
}).listen(8081);