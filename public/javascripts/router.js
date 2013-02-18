define([

  'Backbone',

  //Models
  'app/models/account',

  //Views
  'app/views/topNavView',
  'app/views/flash',
  'app/views/homeView',
  'app/views/projectManager'

], function(

  Backbone,

  //Models
  Account,

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
