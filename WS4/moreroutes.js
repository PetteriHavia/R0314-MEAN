var express = require('express');
var app = express();

app.use(express.static('/public/demoite/'));

app.get('/', function (req, res) {
    res.sendfile("__dirname + /public/index.html");
});

app.get('/list', function (req, res) {
    res.send("Listing data from a file!");
});

app.get('/add', function(req, res) { 
    res.send('Lets try to add some data to file');
});

app.get('*', function(req, res) {
    res.end("Can't find the requested page", 404);
});

app.listen(8081, function() {
    console.log("Example app listening on port 8081!");
});