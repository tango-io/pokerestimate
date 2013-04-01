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
      var stepIndex  = this.$(e.currentTarget).index();
      var movePx = -1 * ((stepIndex + 1) * 390 - 390);
      this.$('#info-steps').css('margin-left', movePx+'px');
      this.$('#screen-steps li').fadeOut('fast');
      var screenToShow = this.$('#screen-steps li')[stepIndex];
      this.$(screenToShow).fadeIn('fast');
    },

  });

  return LandingPageView;

});
