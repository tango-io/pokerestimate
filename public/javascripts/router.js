define([

  'Backbone',

  //Models
  'app/models/account',

  //Views
  'app/views/topNavView',
  'app/views/flash',
  'app/views/homeView'

], function(

  Backbone,

  //Models
  Account,

  //Views
  TopNavView,
  Flash,
  HomeView

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
        model: this.account
      });

      this.flash = new Flash({
        el: '#flash-messages',
        model: this.account
      });

      this.account.fetch();
    },

    home: function(){
      this.account.clear({silent: true});
      this.account.fetch();
      this.home = new HomeView({
        account: this.account,
        el: '#main-content',
        router: this
      });
    },

    projectManager: function(id){
      console.log(id);
    }

  });

  return {
    initialize: function(){
      var router = new Router();
      Backbone.history.start();
    }
  };
});
