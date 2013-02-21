define(['Backbone'], function(Backbone){
  var Player = Backbone.Model.extend({
    defaults: {
      email:   '',
      project: ''
    }
  });

  return Player;
});
