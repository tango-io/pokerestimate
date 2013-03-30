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
      var $step = e.currentTarget;
      var step  = $('#coins li').index($step);
      movePx = -1 * ((step + 1) * 390 - 390);
      $('#info-steps').css('margin-left', movePx+'px');
      $('#screen-steps li').fadeOut('fast');
      screenToShow = $('#screen-steps li')[step];
      $(screenToShow).fadeIn('fast');

      

    },

  });

  return LandingPageView;

});
