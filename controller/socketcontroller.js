module.exports = function(io){
  io.sockets.on('connection', function (socket) {
    // when the client emits 'adduser', this listens and executes
    socket.on('addusertoroom', function(room){
      console.log("user added to " + room);
      // store the room name in the socket session for this client
      socket.room = room;
      // send client to room 1
      socket.join(room);
      // echo to client they've connected
      socket.emit('updatechat', 'SERVER', 'you have connected to room:' + room);
    });

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendline', function (data) {
      // we tell the client to execute 'updatechat' with 2 parameters
      console.log("sending line");
      socket.broadcast.to(socket.room).emit('emitline', data);
    });
   socket.on('clearlines', function () {
      // we tell the client to execute 'updatechat' with 2 parameters
      console.log("sending clear signal");
      socket.broadcast.to(socket.room).emit('emitclear');
    });

    //adduser -> startchat
    /////////////////////Chat/////////////////////////
    // when the client emits 'adduser', this listens and executes
    	socket.on('startchat', function(){
    		// echo to room 1 that a person has connected to their room
    		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has joined the chat');
    	});
      /////////////////////////////////////////////////
      // set username
      socket.on('setusername', function(username){
        // echo to room 1 that a person has connected to their room
        socket.username = username;
        socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', username + ' has connected to this room');
      });
      //when the client emits 'sendchat', this listens and executes
    	socket.on('sendchat', function (data) {
    		// we tell the client to execute 'updatechat' with 2 parameters
    		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    	});
    /*  socket.on("leavechat",function(){
      socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this chat');
    });*/
    //////////////////////////////////////////////

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
      // echo globally that this client has left

      socket.broadcast.emit('updateroom', 'SERVER', 'user has disconnected');
      socket.leave(socket.room);
    });
  });
}
