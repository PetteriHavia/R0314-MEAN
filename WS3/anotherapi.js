
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
    response.write("<h1 align='center'>POKEMON CARD COLLECTION<h1>");
    response.write( html );
    response.end();
    console.log(html);
  })
  .listen(8081); //the server object listens on port 8080
});

//Parse function
function parseData(data) {

    var html = "<table border='0' align='center'>";
    for (var i = 0; i < data.cards.length; i++) {  //Loop and show information
    html+= "<tr>";
    html += "<td><img src='" + data.cards[i].imageUrl + "'></td>";
    html+= "<td>" + "NAME: " + data.cards[i].name + "<br>"
    + "TYPE: " + data.cards[i].types + "</br>"
    + "SET: " + data.cards[i].set + "</br>"
    + "RARITY: " + data.cards[i].rarity + "</td>";
    
    html += "</tr>";
    }
    html += "</table>";
    console.log(html);
    return html;
}