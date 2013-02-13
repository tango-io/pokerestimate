define(['Backbone'], function(Backbone){
  var Tasks = Backbone.Collection.extend({
    initialize: function(projectId){
      this.url = 'api/v1/projects/'+projectId+'/tasks';
    }
  });

  return Tasks;
});
