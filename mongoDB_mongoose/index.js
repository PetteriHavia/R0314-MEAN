const PORT = process.env.PORT || 5000;
var fs = require("fs");
var express = require ("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


// Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Body-parser
app.use(bodyParser.urlencoded({ extended: true}));

// Express
app.use(express.static(__dirname + '/pages'));

// Tuodaan oma funktio itse luodusta moduulista
var mongo = require("./modules/mongo");


// Yhteysosoite
const password = "m001-mongodb-basics";
var uri = "mongodb+srv://m001-student:"+password+"@sandbox-q0ofp.mongodb.net/userData";

// Luodaan yhteys
// mongoose.connect(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

// Yhteyden varmistus
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

// Mongoose schema
var userSchema = mongoose.Schema({
    email: String,
    password: String
});

//ROUTES
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/insert.html');
});

app.post('/', function (req, res) {

    var password = req.body.password;
    var newpass = bcrypt.hashSync(password, saltRounds);

    // Yhdistä schema modeliin + määritä db collection 'info'
    var user = mongoose.model("user", userSchema, 'info');

    var addUser = new user ({
        email: req.body.email,
        password: newpass
    });

    // Tallenna tietokantaan
    addUser.save(function(err,user) {
        if (err) console.log(err);
        console.log("Lisätty: " + user);
    });
    res.redirect('/');
});


app.post('/login', function (req, res) {
    console.log("Lomakkeelta saatu: ");
    console.log(req.body);


    var user = {
        email: req.body.email
    };

    var result = user.findOne({email: email}, function(err, result) {
        if(err) throw err;


        if(result.length == 0)
            res.send("Käyttäjää ei löytynyt");

        else if (bcrypt.compareSync(req.body.password, result[0].password)) {
            console.log("Käyttäjä löytyi");
            res.sendFile(__dirname + '/pages/loggedin.html');
        }else
            res.send("Virheellinen tunnus/salasana");   

    });
});


app.listen(PORT);
 console.log("App running at port:5000")
