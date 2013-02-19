require.config({

  //Shorcut alias
  paths: {
    // Core Libraries
    jQuery: 'libs/jquery',
    Backbone: 'libs/backbone.loader',
    Underscore: 'libs/underscore',
    domReady: 'libs/domready',

    socket: '/socket.io/socket.io',

    reveal: 'foundation/jquery.foundation.reveal',

    'jquery-ui' : 'libs/jquery.ui'
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
    'Backbone': {
      deps: ['jQuery', 'Underscore']
    },

    'reveal'   : ['jQuery'],
    'jquery-ui': ['jQuery']
  },

  waitSeconds: 15
});

require(['domReady', 'router', 'socket'], function(doc, Router, socket){
  Router.initialize(socket);
});
