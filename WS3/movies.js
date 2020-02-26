var fs = require("fs");
var http = require("http");
var axios = require("axios");
var json;

const promise = axios
.get("http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750") //Get information

.then(response => {
    const data = response.data;
    json = data;
    console.log(json); // log JSON information
    
});

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'}); 
    response.write("<html>");
    response.write("<body>");
   
    response.write("<table border ='solid 3px black' align='center'>");
    for (var i=0; i < json.Search.length; i++) {
        response.write("<tr>");
        response.write(("</td><td><img style='width:70%' src=" +json.Search[i].Poster +">"
        + "</td><td>" + "TITLE: " + json.Search[i].Title + "</td><td>"
        + "YEAR: " + json.Search[i].Year + "</td>"));
        response.write("</tr>");
    };
    response.write("</table>");
    response.write("</body>");
    response.write("</html>");
    response.end();
}).listen(8081);
console.log("Server running at http://127.0.0.1:8081/");