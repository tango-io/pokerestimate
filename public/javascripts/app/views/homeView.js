TXE.Views.HomeView = Backbone.View.extend({

  collection: new TXE.Collections.Projects(),

  initialize: function(){
    this.collection.bind('reset', this.render, this).fetch();
  },

  render: function(){
    console.log(this.collection);
  }
});
