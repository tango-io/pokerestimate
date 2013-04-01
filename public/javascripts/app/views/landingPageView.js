define([
  'Backbone',
], function(
  
  Backbone
){

  var LandingPageView = Backbone.View.extend({

    events: {
      'click #coins li' : 'changeStep'
    },

    changeStep: function(e){
      e.preventDefault();
      var step  = this.$('#coins li').index(e.currentTarget);
      var movePx = -1 * ((step + 1) * 390 - 390);
      this.$('#info-steps').css('margin-left', movePx+'px');
      this.$('#screen-steps li').fadeOut('fast');
      var screenToShow = this.$('#screen-steps li')[step];
      this.$(screenToShow).fadeIn('fast');

      

    },

  });

  return LandingPageView;

});
