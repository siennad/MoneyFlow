var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//const cors = require('cors');
//const password_hash = require('password-hash');
//var jwt = require('jsonwebtoken');

const api = require('./backend/api');
const app = express();

app.use('/api', api);
//app.use(cors());

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


// testing server
app.get('/hello', function(req, res) {
    res.send('<h1> Hello there, I am working! </h1>');
});


app.listen(3000, function() {
    console.log('Server running on port 3000...');
})


//
/*
//add-user
router.post('/api/user/add', (req, res) => {
    let pwd = password_hash.generate(req.body.password);
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password_hash: pwd,
    });
    newUser.save((err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add user', data: [] });
        } else {
            //res.json({msg: 'User added'});
            res.json({ success: true, msg: "", data: user });
        }
    });
});

// verify user
router.post('/api/user/verify', (req, res) => {
    let curPass = req.body.password;
    var pass_hash = "";
    User.findOne({ email: req.body.email },
        (err, users) => {
            if (err) {
                res.json({ success: false, msg: "Invalid", data: [] });
            }
            if (users) {
                pass_hash = users.password_hash;
                verification = password_hash.verify(curPass, pass_hash);
                if (verification) {
                    //req.session.user_id = users._id;
                    // token
                    const payload = {
                        role: users.role,
                        user_id: users._id
                    };

                    var token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
                        data: payload
                    }, 'adipixel-secret');

                    //res.redirect(''+ users._id);
                    console.log("User logged in");
                    res.json({ success: true, msg: "Login Successful", token: token });
                } else {
                    res.json({ success: false, msg: "Invalid password", data: [] });
                }
            } else {
                res.json({ success: false, msg: "Invalid email id", data: [] });
            }
        });

});


// jwt middleware to verify token
router.use((req, res, next) => {
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, 'adipixel-secret', (err, decoded) => {
            if (err) {

                return res.json({ success: false, msg: 'Token not valid or expired', data: [] });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({ success: false, msg: 'No token provided', data: [] });
    }
})

// get user by id
router.get('/api/user', (req, res) => {
    User.find({ _id: req.decoded.data.user_id }, (err, user) => {
        if (!err) {
            res.json({ success: true, msg: "", data: user });
        } else {
            res.json({ success: false, msg: "Invalid user", data: [] });
        }
    }).select('-password_hash');
});
*/