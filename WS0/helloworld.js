console.log("Hello world");

var http = require("http");
http.createServer(function(request, response) {

  response.writeHead(200, {'Content-Type' : 'text/html'});

  if (request.url === "/"){
    response.write("Hello world.js Site")
    response.write(`
    <table border='1'>
      <tr>
        <td>Name</td>
        <td>Address</td>
        <td>City</td>
      </tr>
      <tr>
        <td>Ok</td>
        <td>Juu</td>
        <td>Jes</td>
      </tr>
    </table>`);

    response.write("<a href='helloroutes'>To Routes Page<a/><br>");
  }

  else if (request.url === "/helloroutes"){
    response.write("Nyt yrität hakea Hoi Maailmaa!")
    response.write("<a href ='/'>To Hello World</a><br>");
  }



  response.end('Hello world\n');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
