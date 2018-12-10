
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var outputPath = path.join(__dirname, 'dist');

const cors = require('cors');
//const password_hash = require('password-hash');

const api = require('./backend/api');
const app = express();

app.use(cors());

app.use(express.static(outputPath));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);
/*
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'http') {
        return res.redirect(
         ['http://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }
  // Instruct the app
  // to use the forceSSL
  // middleware
  app.use(forceSSL());*/

// testing server
app.get('*', (req, res) => {
  res.sendFile(path.join(outputPath, 'index.html'));
});

app.get('/hello', function(req, res) {
    res.send('<h1> Hello there, I am working! </h1>');
});


var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log(server.address());
    console.log('Server running on port ' + port);
})
// keep heroku app awake
var https = require('https')
setInterval(function() {
    https.get("https://moneyflow-19101997.herokuapp.com");
}, 20000000);
