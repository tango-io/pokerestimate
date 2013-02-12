define([

  'Backbone',

  //Template
  'text!templates/flashTemplate.html'
], function(

  Backbone,

  //Template
  flashTemplate

){

  var Flash = Backbone.View.extend({

    template: _.template(flashTemplate),

    events: {
      'click .close' : 'close'
    },

    initialize: function(){
      this.model.bind('change', this.render, this);
      this.$el.hide();
    },

    close: function(event){
      event.preventDefault();
      this.$el.hide();
    },

    render: function(){
      var message = this.model.get('message');
      this.$el.html(this.template({message: message}));

      if(message){
        this.$el.show('slow');
      }else{
        this.$el.hide('slow');
      }
    }
  });

  return Flash;

});
