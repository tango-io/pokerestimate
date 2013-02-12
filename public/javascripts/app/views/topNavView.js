define([

  'Backbone',

  //Template
  'text!templates/topNavTemplate.html'
], function(

  Backbone,

  //Template
  topNavTemplate

){

  var TopNavView = Backbone.View.extend({

    events: {
      'click a'       : 'preventDefault',
      'click .logout' : 'logout',
      'click .login'  : 'login'
    },

    template: _.template(topNavTemplate),

    initialize: function(){
      this.model.bind('change', this.render, this).fetch();
    },

    preventDefault: function(event){
      event.preventDefault();
    },

    logout: function(){
      this.model.logout();
    },

    login: function(){
      var form = $('#login-form').serialize();
      this.model.login(form);
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  return TopNavView;

});
