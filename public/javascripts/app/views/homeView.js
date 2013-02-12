TXE.Views.HomeView = TXE.Views.MainView.extend({

  template: _.template(TXE.Templates.projectsTopNavListTemplate),  

  collection: new TXE.Collections.Projects(),

  events: {
    'click a' : 'preventDefault',
    'click .item': 'navigate' 
  },

  initialize: function(){
    this.collection.bind('reset', this.render, this).fetch();
  },

  render: function(){
    var template = this.template;
    var $list = this.$el;
    _.each(this.collection.models,function(model){
      var project = template(model.toJSON());
      $list.append(project);
    });
  },

  navigate: function(event){
    var id = $(event.currentTarget).attr('data-id');
    TXE.router.navigate('projects/'+id, true);
  }

});
