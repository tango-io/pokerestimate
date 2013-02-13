define(['Backbone'], function(Backbone){
  var Tasks = Backbone.Collection.extend({
    initialize: function(projectId){
      this.url = 'api/v1/projects/'+projectId+'/tasks';
    },

    search: function(data){
      var field  = _.keys(data).pop();
      var filter = new RegExp(data[field]);

      var result = _.filter(this.models, function(model){
        var value = model.get(field);
        return filter.test(value) ? model : false;
      });

      return result;
    }
  });

  return Tasks;
});
