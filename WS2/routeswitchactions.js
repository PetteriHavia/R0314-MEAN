var http = require("http");
var fs = require("fs");
http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" })

    if (request.url == "/") {
        response.write("Nothing here to see");
    } else if (request.url === "/frontpage.html") {
        response.writeHead(200, { "Content-Type": "text/html" })
        var data = fs.readFileSync("frontpage.html")
        response.write(data.toString());
    } else if (request.url === "/contact.html") {
        response.writeHead(200, { "Content-Type": "text/html" })
        var data = fs.readFileSync("contact.html")
        response.write(data.toString());
    } else if (request.url === "/plaintext") {
        response.writeHead(200, { "Content-Type": "text/plain" })
        var data = fs.readFileSync("example.txt")
        response.write(data.toString());
    }else if (request.url === "/sampledata.json") {
        response.writeHead(200, { "Content-Type": "application/json"})
        var data  = fs.readFileSync("sampledata.json")
        response.write(data.toString());
    }
  }).listen(8081);

console.log("Server is now running at http://127.0.0.1:8081/");
