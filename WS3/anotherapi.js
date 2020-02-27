
var fs = require("fs");
var http = require("http");
var axios = require('axios');
const pokemon = require("pokemontcgsdk"); //npm install pokemontcgsdk
var json;

const promise = axios
.get("https://api.pokemontcg.io/v1/cards") //Get information from source
.then(response => {
    const data = response.data;
    json = data;
    console.log(json); // log JSON information
    var html = parseData(json); // Call function

http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<h1 align='center'>Pokemon Card Collection<h1>");
    response.write( html );
    response.end();
    console.log(html);

    //  response.end(); //end the response
  })
  .listen(8081); //the server object listens on port 8080
});

//Parse function
function parseData(data) {

    var html = "<table border='0' align='center'>";
    for (var i = 0; i < data.cards.length; i++) {  //Loop and show information
    html+= "<tr>";
    html += "<td><img src='" + data.cards[i].imageUrl + "'></td></td>";
    html+= "<td padding-left='10px'>" + "NAME: " + data.cards[i].id + "<br>"
    + "SERIES: " + data.cards[i].rarity + "</td>";
    
    html += "</tr>";
    }
    html += "</table>";
    console.log(html);
    return html;
}

/*
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'}); 

    response.write(html)

    /*response.write("<html><body>");
    response.write("<h1 align ='center'>CARD COLLECTION</h1>");

    response.write("<table border ='solid 3px black' align='center'>");

    for (var i=0; i < json.Search.length; i++) {  //Loop and show information
        response.write("<tr>");
        response.write(("</td><td><img style='width:70%' src=" + json.Search[i].imageUrl +">"
        + "</td><td>" + "NAME: " + json.Search[i].name + "</td><td>"
        + "SET: " + jsonSearch[i].set + "</td>"));
        response.write("</tr>");
    };
    response.write("</table>");
    response.write("</body></html>");


response.end();
}).listen(8081);
console.log("Server running at http://127.0.0.1:8081/");

*/
