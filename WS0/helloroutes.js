console.log("Hello world");

var http = require("http");
http.createServer(function(request, response) {

  response.writeHead(200, {'Content-Type' : 'text/html'});
  response.write("Hello Routes Page Here!");
  response.end('Hello world\n');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
