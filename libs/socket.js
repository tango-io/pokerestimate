var inspect = require('eyes').inspector({ stream: null });

exports.start = function(){

  var players = {};

  process.io.sockets.on('connection', function(socket){

    socket.on('add player', function(player, project){
      if(socket.room === project){return false;}

      //set up socket information
      socket.username = player;
      socket.room     = project;

      //Add the player to the global list
      players[player] = player;

      //Send player to project room
      socket.join(project);

      socket.emit('update players', 'SERVER', 'You have join ' + project);
      socket.broadcast.to(project).emit('update players', 'SERVER', player + ' has connected to this project');
    });

    socket.on('switch project', function(project){

      if(!socket.username){return false;}
      if(socket.room === project){return false;}

      socket.leave(socket.room);
      socket.join(project);

      socket.emit('update players', 'SERVER', 'You have join ' + project);
      socket.broadcast.to(socket.room).emit('update players', 'SERVER', socket.username+' has left this project');

      socket.room = project;
      socket.broadcast.to(project).emit('update players', 'SERVER', socket.username + ' has connected to this project');
    });

    socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete players[socket.username];
		// update list of users in chat, client-side
		process.io.sockets.emit('update players', players);
		// echo globally that this client has left
		socket.broadcast.emit('update players', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});

  });

}

