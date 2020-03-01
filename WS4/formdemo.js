var express = require("express");
var fs = require("fs");
var app = express();

//Require the module required for using form data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); //For parsing application

//Serve a form to the user
app.get('/adduser', function (req, res ) {
    res.sendFile(__dirname + '/public/adduser.html');

});



//DETAILS
app.get('/details', function (req, res) {
    var data = require('./exampledata2.json');

    //Parse results
    var results = '<table border="1">';

    for (var i=0; i < data.length; i++) {
        results +=
        '<tr>' +
        '<td>' + data[i].Name + '</td>' +
        '<td>' + data[i].Email + '</td>' +
        '<td>' + data[i].Date + '</td>' +
        '<td>' + data[i].Company + '</td>' +
        '</tr>' ;
    }
    res.send(results);
});

//ADDUSER
app.post('/adduser', function(req, res) { 
    //Load the existing data from a file    
    var data = require('./exampledata2.json');
    //Create new JSON object and add it to the existing data variable
    data.push({
        "Name": req.body.name,
        "Company": req.body.company,
        "Email": req.body.email,
        "Date": new Date()
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

app.listen(8081, function() {
    console.log("Example app listening on port 8081!");
});