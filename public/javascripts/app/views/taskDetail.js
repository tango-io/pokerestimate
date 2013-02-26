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
      var card = this.$('.selected');

      if(card[0]){
        var estimated = this.selectedTask.get('estimated') || [];
        var player    = this.options.router.account.get('user');
        var num       = card.find('a')[0] ? card.find('a').text() : card.find('input').val();

        estimated.push({
          player: player,
          card: num
        });

        this.selectedTask.save({estimated: estimated});
      }
    },

    render: function(){
      this.selectedTask = this.collection.where({selected: true}).pop();

      //Clean up collection
      _.each(this.collection.models, function(model){
        model.set({selected: false}, {silent: true});
      });

      var task = this.selectedTask.toJSON();
      task.labels = task.labels ? task.labels[0].split(',') : [];
      task.description = typeof task.description === 'string' ? task.description : 'No description';
      task.estimated = task.estimated || [];

      this.$el.html(this.template(task));
    }

  });

  return TaskDetail;
});
