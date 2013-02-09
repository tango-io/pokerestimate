TXE.Router = Backbone.Router.extend({ 

  routes: {
    '' : 'home'
  },

  initialize: function(){
    var user = $('#user').val();

    this.user = {
      logged: user === 'null' ? false : true,
      email:  user
    };

  },

  home: function(){
    if(this.user.logged){
      this.homeView = new TXE.Views.HomeView({el: '.dropdown'});
    }
  }

});

