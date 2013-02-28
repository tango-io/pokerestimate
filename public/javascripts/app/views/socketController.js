define(['Backbone', 'socket'], function(Backbone, io){
  var SocketController = Backbone.View.extend({

    el: '#main-content',

    socketEvents: {
      'update estimations' : 'updateEstimations',
      'update players'     : 'updatePlayers',
      'closing'            : 'closeGame'
    },

    __initialize: function(){
      window.socket = io.connect();
      var view      = this;

      _.each(this.socketEvents, function(method, key){
        if(typeof view[method] === 'function'){
          socket.on(key, _.bind(view[method], view));
        }
      });

    },

    initialize: function(){
      this.message = this.options.router.playerMessage;

      this.message.on('change', this.showMessage, this);
      this.__initialize();
    },

    showMessage: function(){
      var message = this.message.get('message');
      this.$('.js-message').text(message);
    },

    updatePlayers: function(message, list){
      //Populate message
      this.message.set({ message: message });

      //Update player list
      var pls = _.map(list, function(v, k){return v;});
      this.options.router.players.update(pls);
    },

    updateEstimations: function(message, task, estimations){
      var router = this.options.router;
      var tasks  = router.project.taskList.collection;

      //Populate message
      this.message.set({ message: message });

      var taskModel = tasks.get(task);

      //Update task if selected
      if(taskModel){
        taskModel.save({estimated: estimations});
      }

    },

    closeGame: function(message, task, time){
      var router = this.options.router;
      var tasks  = router.project.taskList.collection;

      var taskModel = tasks.get(task);

      if(taskModel){
        var closed = taskModel.get('estimated') ? true : false;
        taskModel.set({closed: closed, time: time}).trigger('timer');
      }

    }

  });

  return SocketController;
});
