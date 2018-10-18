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


app.listen(8080, function() {
    console.log('Server running on port 8080...');
})