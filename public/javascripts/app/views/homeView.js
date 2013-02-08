TXE.Views.HomeView = Backbone.View.extend({

  template: _.template(TXE.Templates.projectsTopNavListTemplate),  

  collection: new TXE.Collections.Projects(),

  initialize: function(){
    this.collection.bind('reset', this.render, this).fetch();
  },

  render: function(){
    console.log(this.collection);
    var template = this.template;
    _.each(this.collection.models,function(model){
      var project = template(model.toJSON());
      $('.dropdown').append(project);
    });
  }
});
