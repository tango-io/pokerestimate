define([

  'Backbone',

  //Templates
  'text!templates/project-page/closeGameTemplate.html'
], function(

  Backbone,

  //Template
  closeGameTemplate
){
  var GameController = Backbone.View.extend({

    template: _.template(closeGameTemplate),

    initialize: function(){ },

    close: function(event){
      event.preventDefault();
      var task = this.selectedTask.get('id');
      socket.emit('close game', task);
    },

    render: function(){
      var estimations = this.selectedTask.get('estimated') || [];
      var time = this.selectedTask.get('time');

      if(!estimations[0]){
        estimations.push({
          player: 'No one estimated',
          card: '?'
        });
      }

      this.$el.html(this.template({estimations: estimations, time: time}));
    }

  });

  return GameController;
});
