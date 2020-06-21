console.log('setting up...');
let express = require('express'),
	app = express(),
	http = require('http'),
	socketIO = require('socket.io'),
	fs = require('fs'),
	server,
	io;

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
});

server = http.Server(app);

server.listen(5000);
console.log('server started at localhost:5000')

io = socketIO(server);

io.on('connection', function (socket){
	console.log('io connected...');
	socket.emit('greeting-from-server', {
		greeting: 'Hello Client'
	});
	socket.on('greeting-from-client', function(message){
		console.log(message);
	});
});