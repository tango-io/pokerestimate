define([

  'Backbone',

  //Template
  'text!templates/project-page/taskDetailTemplate.html'
], function(

  Backbone,

  taskDetailTemplate
){
  var TaskDetail = Backbone.View.extend({

    template: _.template(taskDetailTemplate),

    initialize: function(){
      this.collection.bind('change:selected', this.render, this);
    },

    render: function(){
      var selectedTask = this.collection.where({selected: true}).pop();

      //Clean up collection
      _.each(this.collection.models, function(model){
        model.set({selected: false}, {silent: true});
      });

      var task = selectedTask.toJSON();
      task.labels = task.labels || [];
      task.description = typeof task.description === 'string' ? task.description : 'No description';

      this.$el.html(this.template(task));
    }

  });

  return TaskDetail;
});
