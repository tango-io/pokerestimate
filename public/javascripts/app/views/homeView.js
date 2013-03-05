define([
  'Backbone',

  //Views
  'app/views/projectsView'
], function(
  
  Backbone,

  //Views
  projectsView
){

  var HomeView = Backbone.View.extend({

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
