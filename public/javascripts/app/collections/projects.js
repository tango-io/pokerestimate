define(['Backbone', 'app/models/project'], function(Backbone, model){
  var Projects = Backbone.Collection.extend({
    url: 'api/v1/projects',
    model: model
  });

  return Projects;
});
