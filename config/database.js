var mongodb = require('mongodb');
var inspect  = require('eyes').inspector({ stream: null });

exports.close = function(){
  Database.close();
};

exports.open = function(database, callback){
  var connection = database.connection;
  var user       = database.user;

  var server = new mongodb.Server(connection.host, connection.port, connection.options, connection.native_parser);
  var Database = new mongodb.Db(database.name, server, {safe: false});

  console.log(inspect('Opening database...'));

  Database.open(function(error, db){

    if(error){return callback.call(this, error);}
    console.log(inspect('Authenticating...'));

    db.authenticate(user.username, user.password, function (err, replies) {
      console.log(inspect("We are now connected and authenticated ."));

      var collections = {
        users: new mongodb.Collection(db, "users"),
        tasks: new mongodb.Collection(db, "tasks")
      };

      return callback.call(this, err, collections);
    });

  });

};

