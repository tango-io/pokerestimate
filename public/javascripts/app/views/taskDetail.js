define([

  'Backbone',

  //Views
  'app/views/gameController',

  //Template
  'text!templates/project-page/taskDetailTemplate.html'
], function(

  Backbone,

  //Views
  GameController,

  taskDetailTemplate
){
  var TaskDetail = Backbone.View.extend({

    template: _.template(taskDetailTemplate),

    events: {
      'click .card'      : 'play',
      'click .js-save'   : 'save',
      'click .js-close'  : 'close'
    },

    initialize: function(){
      this.collection.bind('change:selected', this.render, this);
      this.collection.bind('change:estimated', this.updateEstimations, this);
      this.collection.bind('timer', this.closed, this);

      this.game = new GameController();
    },

    play: function(event){
      event.preventDefault();
      this.$('.selected').removeClass('selected');
      $(event.currentTarget).addClass('selected');
    },

    close: function(event){
      event.preventDefault();
      if(this.selectedTask.get('estimated')){
        this.game.close(event);
      }
    },

    save: function(event){
      event.preventDefault();
      var card = this.$('.selected');

      if(card[0]){
        var estimated = this.selectedTask.get('estimated') || [];
        var task      = this.selectedTask.get('id');
        var player    = this.options.router.account.get('user');
        var num       = card.find('input')[0] ? card.find('input').val() : card.attr('data-value');

        var me  = _.findWhere(estimated, {player: player}) || {player: player};
        me.card = num;
        socket.emit('estimate', task, _.union(estimated, me));
      }
    },

    updateEstimations: function(){
      if(this.selectedTask){
        var estimations = this.selectedTask.get('estimated');
        var list = this.$('.players');
        list.html('');

        _.each(estimations, function(estimation){
          list.append('<li class="player">'+estimation.player+'</li>');
        });
      }
    },

    closed: function(){
      if(this.selectedTask){
        if(this.selectedTask.get('time')){
          this.game.render();
        }
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

      this.game.selectedTask = this.selectedTask;
      this.game.setElement(this.el);

      if(this.selectedTask.get('closed')){
        this.game.render();
      }else{
        this.$el.html(this.template(task));
      }
    }

  });

  return TaskDetail;
});
