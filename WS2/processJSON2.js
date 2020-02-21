var http = require("http");
http.createServer(function (request, response) {

var data = require('./sampledata.json');

response.write("<table border =''solid 1px black'>");
for (var i=0; i < data.length; i++) {
    response.write("<tr>");
    response.write("<td>" + data[i].name + "</td>");
    response.write("<td>" + data[i].age + "</td>");
    response.write("<td>" + data[i].company + "</td>");
    response.write("<td>" + data[i].address + "</td>");
    response.write("</tr>"); // End <tr> here
};
response.write("</table>"); //End <table> here

response.end();
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');