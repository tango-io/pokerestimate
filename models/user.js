module.exports = {

  getByUsername: function(username, callback){
    //TODO find user by username on mongodb
    return callback({id: 1, name: 'Narciso', email: 'narciso.guillen@tangosource.com', password: '12345'});
  },

  getById: function(id, callback){
    //TODO find user by id on mongodb
    return callback({id: 1, name: 'Narciso', email: 'narciso.guillen@tangosource.com', password: '12345'});
  }

};
