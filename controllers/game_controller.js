var inspect  = require('eyes').inspector({ stream: null });

module.exports = {

  index: function(req, res, next){
    var project_id = req.query.project_id;

    process.database.games.find({project_id: project_id}, function(error, games){
      if(error){res.send(error); return false;}

      games.toArray(function(err, results){
        if(err){res.send(err); return false;}

        res.send(results);
      });

    });

  },

  create: function(game){
    process.database.games.save(game, function(error, savedGame){
      if(error){
        process.io.sockets.emit('error', error);
        return false;
      }

      process.io.sockets.emit('populate game', null, game);
    });
  },

  update: function(game){
    process.database.games.update({_id: game._id},{ $set: {name: game.name} },  function(error, savedGame){
      if(error){
        process.io.sockets.emit('error', error);
        return false;
      }

      process.io.sockets.emit('updated game', null, game);
    });
  },

  delete: function(_id){
    process.database.games.remove({_id: _id},  function(error, deletedGame){
      if(error){
        process.io.sockets.emit('error', error);
        return false;
      }

      process.io.sockets.emit('unpopulate game', null, _id);
    });
  }

};
