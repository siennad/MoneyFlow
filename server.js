var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

const cors = require('cors');
//const password_hash = require('password-hash');

const api = require('./backend/api');
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

// testing server
app.get('/hello', function(req, res) {
    res.send('<h1> Hello there, I am working! </h1>');
});


var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log(server.address());
    console.log('Server running on port ' + port);
})

// keep heroku app awake

var http = require("http");
setInterval(function() {
    http.get("http://moneyflow-19101997.herokuapp.com");
}, 1000000);