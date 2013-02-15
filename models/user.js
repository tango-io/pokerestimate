var pivotal  = require("../libs/pivotal");
var bcrypt   = require('bcrypt');
var inspect  = require('eyes').inspector({ stream: null });

module.exports = {

  getByUsername: function(username, callback){
    if(!process.database){return callback('Damn! mongo is not ready, please try again');}

    process.database.users.findOne({email: username}, function(err, user){
      return callback(err, user);
    });
  },

  getById: function(id, callback){
    if(!process.database){return callback('Damn! mongo is not ready, please try again');}

    process.database.users.findOne({id: id}, function(err, user){
      return callback(err, user);
    });
  },

  create: function(data, callback){
    if(!process.database){return callback('Damn! mongo is not ready, please try again');}

    bcrypt.hash(data.password, 10, function(err, hash) {
      data.password = hash;
    });

    pivotal.access({username: data.email, password: data.password}, function(error, result){
      if(error){return callback({message: error.stack});}

      if(result.message){ return callback(error, result); }

      data.id    = result.token.id[0]._;
      data.token = result.token.guid[0];

      process.database.users.save(data, {safe: true}, function(err, user){
        return callback(err, user);
      });

    });

  }

};
