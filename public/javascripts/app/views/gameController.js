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

    close: function(event){
      var task = this.selectedTask.get('id');
      socket.emit('close game', task);
    },

    killTask: function(){
      var task = this.selectedTask.get('id');
      var kill = _.once(function(){
        socket.emit('kill task', task);
      });

      kill();
    },

    render: function(){
      var estimations = this.selectedTask.get('estimated') || [];
      var time        = this.selectedTask.get('time');
      var total       = _.countBy(estimations, function(estimation){
        return estimation.card;
      });

      var max    = _.max(total, function(point){return point;});

      var result = _.compact(_.map(total, function(count, point){
        return count === max ? point : false; 
      })).pop();

      if(!estimations[0]){
        estimations.push({
          player: 'No one estimated',
          card: '?'
        });
      }

      if(time === '0'){
        this.killTask();
      }

      this.selectedTask.set({result: result}, {silent: true});

      this.$el.html(this.template({
        estimations: estimations, 
        time: time, 
        result: result
      }));


    }

  });

  return GameController;
});
