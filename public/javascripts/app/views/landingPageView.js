define([
  'Backbone',
], function(
  
  Backbone
){

  var LandingPageView = Backbone.View.extend({

    events: {
      'click #coins li' : 'changeStep'
    },

    initialize: function(){
      // this.render();
    },

    changeStep: function(){
      console.log('this is the change step');
    },

    render: function(){
      // this.$el.html(this.template());
    }
  });

  return LandingPageView;

});
