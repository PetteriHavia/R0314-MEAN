var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('/public/demoite/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/demosite/index.html');
});

app.get('/list', function (req, res) {
    res.sendFile(__dirname + '/exampledata.txt');
});

app.get('/jsondata', function(req, res) {
    var data = require('./exampledata2.json');
    res.json(data);
})

app.get('/details', function (req, res) {
    var data = require('./exampledata2.json');

    var result = '<table border="1">';

    for(var i=0; i < data.length; i++) {
        results +=
        '<tr>'+
        '<td>' + data[i].Name +'</td>'+
        '<td>' + data[i].Email +'</td>'+
        '</tr>';
    }
    res.send(results);
})

app.get('/add', function(req, res) { 
    res.send('Lets try to add some data to file');
});

app.get('*', function(req, res) {
    res.end("Can't find the requested page", 404);
});

app.listen(8081, function() {
    console.log("Example app listening on port 8081!");
});