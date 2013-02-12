require.config({

  //Shorcut alias
  paths: {
    // Core Libraries
    jQuery: 'libs/jquery',
    Backbone: 'libs/backbone.loader',
    Underscore: 'libs/underscore',
    domReady: 'libs/domready',
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
    'Backbone': {
      deps: ['jQuery', 'Underscore']
    }

  },

  waitSeconds: 15
});

require(['domReady', 'router'], function(doc, Router){
  Router.initialize();
});
