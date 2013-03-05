define([
  'Backbone',

  //Views
  'app/views/projectsView',

  //Templates
  'text!templates/home/boxesTemplate.html'
], function(
  
  Backbone,

  projectsView,

  //Template
  boxesTemplate
){

  var HomeView = Backbone.View.extend({

    template: _.template(boxesTemplate),

    initialize: function(){
      this.projects = new projectsView({
        el: '.js-projects',
        account: this.options.account,
        router: this.options.router
      });

    }

  });

  return HomeView;

});
