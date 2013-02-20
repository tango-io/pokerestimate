var inspect = require('eyes').inspector({ stream: null });

exports.start = function(){

  process.io.sockets.on('connection', function(socket){
    console.log('Someone just connected!');
  });

}

