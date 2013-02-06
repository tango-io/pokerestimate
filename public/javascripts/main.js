var TXE = {
  Models: {},
  Collections: {},
  Views: {},

  Initialize: function(){
    this.router = new TXE.Router();
    Backbone.history.start({pushState: true});
  }
};

$(function(){
  TXE.Initialize();
});
