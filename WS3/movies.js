


var fs = require("fs");
var http = require("http");

var axios = require("axios");
const promise = axios
.get("http://www.omdbapi.com/?apikey=[418fb890]&")

.then(response => {
    const data = response.data;
    console.log(data);

});
console.log(promise);



