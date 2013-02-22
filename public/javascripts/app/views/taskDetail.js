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

    events: {
      'click .card'      : 'play',
      'click .js-save'   : 'save',
      'click .js-cancel' : 'cancel'
    },

    initialize: function(){
      this.collection.bind('change:selected', this.render, this);
    },

    play: function(event){
      event.preventDefault();
      this.$('.selected').removeClass('selected');
      $(event.currentTarget).addClass('selected');
    },

    cancel: function(event){
      event.preventDefault();
    },

    save: function(event){
      event.preventDefault();
    },

    render: function(){
      var selectedTask = this.collection.where({selected: true}).pop();

      //Clean up collection
      _.each(this.collection.models, function(model){
        model.set({selected: false}, {silent: true});
      });

      var task = selectedTask.toJSON();
      task.labels = task.labels ? task.labels[0].split(',') : [];

      task.description = typeof task.description === 'string' ? task.description : 'No description';

      this.$el.html(this.template(task));
    }

  });

  return TaskDetail;
});
