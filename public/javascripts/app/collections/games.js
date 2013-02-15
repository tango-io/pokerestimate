define(['Backbone'], function(Backbone){
  var Games = Backbone.Collection.extend({
    initialize: function(projectId){
      this.url = '/api/v1/projects/'+projectId+'/games';
    }
  });

  return Games;
});
