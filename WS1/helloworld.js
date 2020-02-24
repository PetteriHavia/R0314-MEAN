console.log("Hello world");

var http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });

    if (request.url === "/") {
      response.write("Hello world.js Site");
      response.write(`
    <table border='1'>
      <tr>
        <td>Name</td>
        <td>Address</td>
        <td>City</td>
      </tr>
      <tr>
        <td>Petteri</td>
        <td>Street 1</td>
        <td>Lohja</td>
      </tr>
    </table>`);

      response.write("<a href='helloroutes'>To Routes Page<a/><br>");
    } else if (request.url === "/helloroutes") {
      response.write("Nyt yrität hakea Hello Routes!");
      response.write("<a href ='/'>Back To Hello World</a><br>");
    }

    response.end("Hello world\n");
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");




