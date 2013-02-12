define([

  'Backbone',

  //Models
  'app/models/account',

  //Views
  'app/views/topNavView',
  'app/views/homeView'

], function(

  Backbone,

  //Models
  Account,

  //Views
  TopNavView,
  HomeView

){
  var Router = Backbone.Router.extend({
    routes: {

      //Home
      '' : 'home'

    },

    initialize: function(){
      this.account = new Account();
      
      this.topNav  = new TopNavView({
        el: '#navigator',
        model: this.account
      });
    },

    home: function(){
      this.home = new HomeView({
        account: this.account,
        el: '#main-content'
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
