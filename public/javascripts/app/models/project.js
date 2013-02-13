define(['Backbone'], function(Backbone){
  var Project = Backbone.Model.extend({
    url: 'api/v1/projects'
  });

  return Project;
});
