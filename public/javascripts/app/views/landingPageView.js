define([
  'Backbone',
], function(
  
  Backbone
){

  var LandingPageView = Backbone.View.extend({

    initialize: function(){
      // this.render();
      console.log('in the view')
    },

    render: function(){
      // this.$el.html(this.template());
    }
  });

  return LandingPageView;

});
