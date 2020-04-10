exports.getData = function getResult(user, callback) {
    // Tuodaan moduuli ohjelmaan
    const MongoClient = require("mongodb").MongoClient;
  
    // Määritellään salasana ja yhteysosoite tietokantaan
    const password = "m001-mongodb-basics";
    const uri ="mongodb+srv://m001-student:"+password+"@sandbox-q0ofp.mongodb.net/test?retryWrites=true&w=majority";
  
    // Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä
    // tarvittavia parametreja
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
    // Luodaan yhteys  tietokantaan nimeltä "userData" ja sieltä kokoelmaan "info"
    client.connect(err => {
      const collection = client.db("userData").collection("info");
      if (err) throw err;
  
      collection.find(user).toArray(function(err, result) {
        if (err) throw err;
  
        callback(err, result);
        
      });
    });
  };



  /*

    //Etsi käyttäjää tietokannasta
    var result = mongo.getData(user, function (err, result) {
        if (err) throw err;
        console.log("getData result: ");
        console.log(result);

        if (result.length == 0) res.send("Käyttäjää ei ole");
    // Vertaa salasanaa tietokannassa olevaan bcrypt salasanaan
        else if (bcrypt.compareSync(req.body.password, result[0].password)) {
            console.log("Password match");
            res.render('pages/loggedin', {data: result });   
        }else res.send("Virheellinen tunnus/salasana");
    });
});
*/