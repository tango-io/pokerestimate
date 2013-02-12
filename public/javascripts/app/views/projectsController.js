define([

  'Backbone',

  'text!templates/home/projectTemplate.html'

], function(

  Backbone,

  projectTemplate
){
  var ProjectsController = Backbone.View.extend({

    template: _.template(projectTemplate),

    initialize: function(){
      this.collection.bind('reset', this.render, this);
    },

    render: function(){
      var template = this.template;
      var $el = this.$el;

      _.each(this.collection.models, function(model){
        $el.append(template(model.toJSON()));
      });
    }
  });

  return ProjectsController;
});
