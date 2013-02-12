define(['Backbone'], function(Backbone){
  var Projects = Backbone.Collection.extend({
    url: 'api/v1/projects'
  });

  return Projects;
});
