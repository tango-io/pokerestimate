define([

  'Backbone',

  //Template
  'text!templates/project-page/gamePageTemplate.html'

], function(

  Backbone,

  //Template
  gamePageTemplate
){

  var ProjectManager = Backbone.View.extend({

    template: _.template(gamePageTemplate),

    initialize: function(){
      this.render();
    },

    render: function(){
      this.$el.html(this.template({project: {name: 'Testing'}}));
    }
  });

  return ProjectManager;

});
