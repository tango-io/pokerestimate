define(['Backbone'], function(Backbone){
  var TaskDetail = Backbone.View.extend({

    initialize: function(){
      this.collection.bind('change:selected', this.render, this);
    },

    render: function(){
      var selectedTask = this.collection.where({selected: true});

      //Clean up collection
      _.each(this.collection.models, function(model){
        model.set({selected: false}, {silent: true});
      });

    }

  });

  return TaskDetail;
});
