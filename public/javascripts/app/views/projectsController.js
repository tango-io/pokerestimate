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

    start: function(){
      var loading = this.template({name: 'Loading...', id: 1});
      this.$el.append(loading);
      this.collection.fetch();
    },

    render: function(){
      this.$el.empty();
      var template = this.template;
      var $el = this.$el;

      _.each(this.collection.models, function(model){
        $el.append(template(model.toJSON()));
      });
    }
  });

  return ProjectsController;
});
