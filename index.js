const PORT = process.env.PORT || 5000;
var http = require("http");

//create a server object:
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World!\n"); //write a response to the client
    response.end("This is the end"); //end the response
  })
  .listen(PORT); //the server object listens on port 8080


package.json:

{
  "name": "node workshop 3",
  "version": "0.1.0",
  "description": "A sample Node.js app in Heroku",
  "engines": {
    "node": "12.x"
  },
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "node test.js"
  }


}
