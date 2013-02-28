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
      players[player] = {
        project: project,
        email:   player
      };

      //Send player to project room
      socket.join(project);

      socket.emit('update players', 'You have join ' + project, players);
      socket.broadcast.to(project).emit('update players', player + ' has connected to this project', players);
    });

    socket.on('switch project', function(project){

      if(!socket.username){return false;}
      if(socket.room === project){return false;}

      //Update player to the global list
      players[socket.username] = {
        project: project,
        email:   socket.username
      };

      socket.leave(socket.room);
      socket.join(project);

      socket.emit('update players', 'You have join ' + project, players);
      socket.broadcast.to(socket.room).emit('update players', socket.username+' has left this project', players);

      socket.room = project;
      socket.broadcast.to(project).emit('update players', socket.username + ' has connected to this project', players);
    });

    socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete players[socket.username];
    
		// update list of users in chat, client-side
		// process.io.sockets.emit('update players', players);
		// echo globally that this client has left
    
		socket.broadcast.to(socket.room).emit('update players', socket.username + ' has disconnected', players);
		socket.leave(socket.room);
	});

  socket.on('estimate', function(task, estimations){
    socket.emit('update estimations', 'You have estimated', task, estimations);
    socket.broadcast.to(socket.room).emit('update estimations', socket.username+' has estimated', task, estimations);
  });

  socket.on('close game', function(task){
    var seconds = 10;

    var timer = setInterval(function(){

      socket.emit('closing', 'You have close a game', task, seconds+'');
      socket.broadcast.to(socket.room).emit('closing', socket.username+' has close a game', task, seconds+'');

      if(seconds === 0){
        clearInterval(timer);
      }

      seconds-=1;

    }, 1000);

  });

  socket.on('kill task', function(task){
    socket.broadcast.to(socket.room).emit('remove task', task);
  });

  });

}
