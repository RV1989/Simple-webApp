// modules =================================================
var express        = require('express');
var app            = express();
var path = require('path');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var projects = require('./routes/projects');


// configuration ===========================================
// set our port
var port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', projects);


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);
