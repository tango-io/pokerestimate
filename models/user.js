var database = require("../config/database");
var inspect  = require('eyes').inspector({ stream: null });

module.exports = {

  getByUsername: function(username, callback){
    database.open(function(err, db){
      db.collection('users', function(error , userCollection){
        userCollection.findOne({email: username}, function(err, user){
          database.close();
          return callback(error, user);
        });
      });
    });
  },

  getById: function(id, callback){
    database.open(function(err, db){
      db.collection('users', function(error , userCollection){
        userCollection.findOne({id: id}, function(err, user){
          database.close();
          return callback(err, user);
        });
      });
    });
  },

  create: function(data, callback){
    return callback(null, data);
  }

};
