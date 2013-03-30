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
  'app/views/projectManager',
  'app/views/socketController',
  'app/views/landingPageView'

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
  ProjectManager,
  socketController,
  LandingPageView

){
  var Router = Backbone.Router.extend({
    routes: {

      //Home
      'g' : 'home',
      '' : 'landing',

      'project/:id': 'projectManager'
    },

    account: new Account(),
    players: new Players(),

    playerMessage: new PlayerMessage(),

    initialize: function(){
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

      //Socket controller
      this.socket = new socketController({ router: this });
    },

    landing: function(){
      this.landing = new LandingPageView({
        el: '#landing-page',
        router: this
      });
    },

    home: function(){
      console.log('home');
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
        router: this
      });
    }

  });

  return {
    initialize: function(){
      var router = new Router();
      Backbone.history.start();
    }
  };
});
