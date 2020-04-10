const PORT = process.env.PORT || 5000;
var fs = require("fs");
var express = require ("express");
var app = express();
var bodyParser = require("body-parser");


// Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Body-parser
app.use(bodyParser.urlencoded({ extended: true}));

// Express
app.use(express.static(__dirname + '/pages'));

// Tuodaan oma funktio itse luodusta moduulista
var mongo = require("./modules/mongo");


// Tuodaan moduuli ohjelmaan
const MongoClient = require("mongodb").MongoClient;
// Määritellään salasana ja yhteysosoite tietokantaan (tämän saa MongoDB Atlas-palvelusta)
const password = "m001-mongodb-basics";
const uri="mongodb+srv://m001-student:"+password+"@sandbox-q0ofp.mongodb.net/test?retryWrites=true&w=majority";
// Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Luodaan yhteys ja tulostetaan tieto virheestä tai onnistumisesta
// virhetiedot palaututuvat err muuttujaan, hakujen tulokset r-muuttujaan
client.connect( function (err,r)  {
   if (err) throw err;
   else console.log("Connected!");
// Suljetaan tietokantayhteys
    client.close();
});

//ROUTES
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/insert.html');
});

app.post('/', function (req, res) {

    var password = req.body.password;
    var newpass = bcrypt.hashSync(password, saltRounds);

    // Määritellään tietokantaan tehtävä kyselu JSON-oliona
    var query = {
        title: new RegExp("Uusi")
      };

    // Lisättävä tieto
    var newData = {
        email: req.body.email,
        password: newpass
    };

    // Luodaan yhteys  tietokantaan nimeltä "userData" ja sieltä kokoelmaan "info"
    client.connect(err => {
        const collection = client.db("userData").collection("info");
        if (err) throw err;

        // Suoritetaan lisäys collection-olion avulla
        collection.insertOne(newData, function (err, r) {
        // Tulosta konsoliin tieto montako alkiota on lisätty
            console.log(r.insertedCount);
        });
    });
    client.close();
    res.redirect('/');
});


app.post('/login', function (req, res) {
    console.log("Lomakkeelta saatu: ");
    console.log(req.body);

    var user = {
        email: req.body.email
    };

    console.log("Existing: ");
    console.log(user);
    
    //Etsi käyttäjää tietokannasta
    var result = mongo.getData(user, function (err, result) {
        if (err) throw err;
        console.log("getData result: ");
        console.log(result);

        if (result.length == 0)
            res.send("Käyttäjää ei löytynyt");
    // Vertaa salasanaa tietokannassa olevaan bcrypt salasanaan
        else if (bcrypt.compareSync(req.body.password, result[0].password)) {
            console.log("Käyttäjä löytyi");
            res.sendFile(__dirname + '/pages/loggedin.html');   
        }else
            res.send("Virheellinen tunnus/salasana");
    });
});


app.listen(PORT);
 console.log("App running at port:5000")
