var database = require("../config/database");
var pivotal  = require("../libs/pivotal");
var bcrypt   = require('bcrypt');
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

    bcrypt.hash(data.password, 10, function(err, hash) {
      data.password = hash;
    });

    pivotal.access({username: data.email, password: data.password}, function(err, result){
      if(result.message){ return callback(err, result); }

      data.id    = result.token.id[0]._;
      data.token = result.token.guid[0];

      database.open(function(err, db){
        db.collection('users', function(error , userCollection){
          userCollection.save(data, {safe: true}, function(err, user){
            database.close();
            return callback(err, user);
          });
        });
      });

    });

  }

};
