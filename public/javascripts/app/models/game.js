define(['Backbone'], function(Backbone){

  var Game = Backbone.Model.extend({
    idAttribute: "_id",

    save: function(error, data){
      if(error){console.log(error); return false;}
      var game = data.collection.at(data.collection.length - 1).toJSON();
      socket.emit('create game', game);
    }
  });

  return Game;

});
