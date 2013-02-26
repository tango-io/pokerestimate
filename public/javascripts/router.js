define([

  'Backbone',

  //Models
  'app/models/account',
  'app/models/playerMessage',

  //Collection
  'app/collections/players',

  //Views
  'app/views/topNavView',
  'app/views/flash',
  'app/views/homeView',
  'app/views/projectManager'

], function(

  Backbone,

  //Models
  Account,
  PlayerMessage,

  //Collection
  Players,

  //Views
  TopNavView,
  Flash,
  HomeView,
  ProjectManager

){
  var Router = Backbone.Router.extend({
    routes: {

      //Home
      '' : 'home',

      'project/:id': 'projectManager'
    },

    initialize: function(){
      this.account = new Account();
      this.players = new Players();
      this.playerMessage = new PlayerMessage();

      this.topNav  = new TopNavView({
        el: '#navigator',
        model: this.account,
        router: this
      });

      this.flash = new Flash({
        el: '#flash-messages',
        model: this.account
      });

      this.account.fetch();

      var players = this.players;
      var playerMessage = this.playerMessage;
      var self = this;

      socket.on('update players', function(message, list){
        playerMessage.set({
          message: message
        });
        var pls = _.map(list, function(v, k){return v;});
        players.update(pls);
      });

      socket.on('update estimations', function(message, task, estimations){
        playerMessage.set({
          message: message
        });

        var card = self.project.taskList.collection.get(task);
        card.save({estimated: estimations});
      });
    },

    home: function(){
      this.account.reload();

      this.home = new HomeView({
        account: this.account,
        el: '#main-content',
        router: this
      });
    },

    projectManager: function(id){
      this.project = new ProjectManager({
        el: '#main-content',
        projectId: id,
        players: this.players,
        playerMessage: this.playerMessage,
        router: this
      });
    }

  });

  return {
    initialize: function(socket){
      window.socket = socket.connect();
      var router = new Router();
      Backbone.history.start();
    }
  };
});
