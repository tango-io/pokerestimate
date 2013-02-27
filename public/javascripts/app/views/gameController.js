define([

  'Backbone',

  //Templates
  'text!templates/project-page/closeGameTemplate.html'
], function(

  Backbone,

  //Template
  closeGameTemplate
){
  var GameController = Backbone.View.extend({

    template: _.template(closeGameTemplate),

    initialize: function(){ },

    close: function(event){
      event.preventDefault();
      this.selectedTask.set({closed: true});
      this.render();
    },

    render: function(){
      var estimations = this.selectedTask.get('estimated') || [];

      if(!estimations[0]){
        estimations.push({
          player: 'No one estimated',
          card: '?'
        });

        this.selectedTask.set({closed: false});
      }

      this.$el.html(this.template({estimations: estimations}));
    }

  });

  return GameController;
});
