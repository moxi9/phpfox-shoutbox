
var io = require('socket.io')(3000),
	messages = [];

io.on('connection', function(socket) {
	socket.on('add', function(data) {
		messages.push(data);
		io.sockets.emit('add', messages);
	});

	socket.on('load', function() {
		io.sockets.emit('add', messages);
	});
});