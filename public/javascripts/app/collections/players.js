define(['Backbone', 'app/models/player'], function(Backbone, model){
  var Players = Backbone.Collection.extend({
    model: model
  });

  return Players;
});
