define([

  'Backbone',

  'text!templates/home/projectTemplate.html'

], function(

  Backbone,

  projectTemplate
){
  var ProjectsController = Backbone.View.extend({

    template: _.template(projectTemplate),

    events: {
      'click .item' : 'navigate'
    },

    initialize: function(){
      this.collection.bind('reset', this.render, this);
    },

    start: function(){
      var loading = this.template({name: 'Loading...', id: 'loadind'});
      this.$el.append(loading);
      this.collection.fetch();
    },

    navigate: function(event){
      var id = this.$(event.currentTarget).attr('data-id');

      if(id !== 'loading'){
        var project = this.$(event.currentTarget).find('a').text();

        socket.emit('switch project', project);

        this.options.router.navigate('project/'+id, true);
      }
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
