// keep heroku app awake
var https = require('https')
setInterval(function() {
    https.get("https://moneyflow-19101997.herokuapp.com");
}, 20000000);
