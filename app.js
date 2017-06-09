var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var maincontroller = require('./controller/controllery');
var socketcontroller = require('./controller/socketcontroller');
app.set('view engine', 'ejs');

app.use(express.static('./jmagic'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
maincontroller(app);
socketcontroller(io);
server.listen(3000);
console.log('you are waiting 3000');
