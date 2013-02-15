var inspect  = require('eyes').inspector({ stream: null });

module.exports = {

  index: function(req, res, next){

    process.database.games.find(function(error, games){
      if(error){res.send(error); return false;}

      games.toArray(function(err, results){
        if(err){res.send(err); return false;}

        console.log(inspect(results));
        res.send(results);
      });

    });

  }

};
