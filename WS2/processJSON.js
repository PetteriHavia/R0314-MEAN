//Path
var data = require('./sampledata.json');

//Loop through all selected content
for (var i=0; i < data.length; i++) {
    console.log(data[i].name);
    console.log(data[i].age);
    console.log(data[i].company);
    console.log(data[i].address);
}
