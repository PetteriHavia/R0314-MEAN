
var fs = require("fs");
var http = require("http");
var axios = require('axios');
var pokemon = require("pokemontcgsdk"); //npm install pokemontcgsdk
var json;

const promise = axios
.get("https://api.pokemontcg.io/v1/cards") //Get information from source
.then(response => {
    const data = response.data;
    json = data;
    console.log(json); // log JSON information
});

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'}); 
    response.write("<html><body>");
    response.write("<h1 align ='center'>CARD COLLECTION</h1>");
    response.write("<table border ='solid 2px black' align='center'>");

    for (var i=0; i < json.Search.length; i++) {  //Loop and show information
        response.write("<tr>");
        response.write(("</td><td><img style='width:70%' src=" + json[i].imageUrl +">"
        + "</td><td>" + "NAME: " + json[i].name + "</td><td>"
        + "NUMBER: " + json[i].set + "</td>"));
        response.write("</tr>");
    };
    response.write("</table>");
    response.write("</body></html>");//jotain

response.end();
}).listen(8081);
console.log("Server running at http://127.0.0.1:8081/");


