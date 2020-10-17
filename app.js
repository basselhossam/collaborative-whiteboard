const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const dotenv = require('dotenv');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
dotenv.config();
const maincontroller = require('./controller/controllery');
const socketcontroller = require('./controller/socketcontroller');
app.set('view engine', 'ejs');

app.use(express.static('./jmagic'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
maincontroller(app);
socketcontroller(io);
const appPort = process.env.PORT || 3000;
server.listen(appPort);
console.log('you are waiting ' + appPort);
