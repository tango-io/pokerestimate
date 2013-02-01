var mongodb = require('mongodb');

var host = "alex.mongohq.com";
var port = 10016;
var options = {};

var server = new mongodb.Server(host, port, options, {native_parser: true});
var Database = new mongodb.Db("TexasEstimateEm", server, {safe: false});

var inspect  = require('eyes').inspector({ stream: null });

exports.close = function(){
  Database.close();
};

exports.open = function(callback){
  console.log(inspect('Opening database...'));

  Database.open(function(error, db){

    if(error){return callback.call(this, error);}
    console.log(inspect('Authenticating...'));

    db.authenticate('narciso', 'guillen', function (err, replies) {
      console.log(inspect("We are now connected and authenticated ."));

      var collections = {
        users: new mongodb.Collection(db, "users")
      };

      return callback.call(this, err, collections);
    });

  });

};

