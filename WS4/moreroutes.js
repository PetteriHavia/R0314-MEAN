var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('/public/demoite/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/list', function (req, res) {
    res.sendFile(__dirname + '/exampledata.txt');
});

app.get('/jsondata', function(req, res) {
    var data = require('./exampledata2.json');
    res.json(data);
});

app.get('/details', function (req, res) {
    //Load the existing data from a file  
    var data = require('./exampledata2.json');
    //Parse the results into variable
    var results = '<table border="1" align="center">';

    for(var i=0; i < data.length; i++) {
        results +=
        '<tr>'+
        '<td>' + data[i].Name +'</td>'+
        '<td>' + data[i].Email +'</td>'+
        '<td>' + data[i].Date +'</td>'+
        '<td>' + data[i].Company +'</td>'+
        '</tr>';
    }
    res.send(results);
});

app.get('/add', function(req, res) { 
    res.send('Lets try to add some data to file');

    //Load the existing data from a file    
    var data = require('./exampledata2.json');

    //Create new JSON object and add it to the existing data variable
    data.push({
        "Name": "Petteri Havia",
        "Company": "Laurea",
        "Email": "petteri@laurea.fi",
        "Date": "30/3/2016 \r\n"
    });

    //Convert the JSON object to a string format
    var jsonStr = JSON.stringify(data);

    //Write data to file
    fs.writeFile('exampledata2.json', jsonStr, (err) => {
        if(err) throw err;
        console.log('It\'s saved!');
    });

    res.send("Saved the data to a file. Browse to the /details to see the contents of the file");
});

app.get('./adduser', function (req, res ) {
    res.sendFile(__dirname + '/public/adduser.html');

});

app.get('*', function(req, res) {
    res.end("Can't find the requested page", 404);
});

app.listen(8081, function() {
    console.log("Example app listening on port 8081!");
});