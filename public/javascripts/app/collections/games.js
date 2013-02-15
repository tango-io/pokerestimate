define(['Backbone', 'app/models/game'], function(Backbone, model){
  var Games = Backbone.Collection.extend({
    url: '/api/v1/project/games',
    model: model
  });

  return Games;
});
