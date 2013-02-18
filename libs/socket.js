var gameController = require('../controllers/game_controller');
var inspect        = require('eyes').inspector({ stream: null });

exports.start = function(){

  process.io.sockets.on('connection', function(socket){
    console.log('Someone just connected!');

    socket.on('create game', gameController.create);
    socket.on('update game', gameController.update);
    socket.on('delete game', gameController.delete);

  });

}

