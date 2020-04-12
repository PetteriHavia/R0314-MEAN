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
