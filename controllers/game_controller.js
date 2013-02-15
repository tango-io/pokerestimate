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

  create: function(req, res, next){

    var game = {
      _id: req.body._id,
      name: req.body.name,
      project_id: req.body.projectId
    };

    process.database.games.save(game, function(error, savedGame){
      if(error){res.send(error); return false;}

      res.send({sucess: true});
    });

  }

};
