define([

  'Backbone',

  //Collection
  'app/collections/tasks',

  //Template
  'text!templates/project-page/taskItemTemplate.html',
], function(

  Backbone,

  //Collection
  Tasks,

  //Template
  itemTemplate
){

  var TaskController = Backbone.View.extend({

    template: _.template(itemTemplate),

    initialize: function(){
      this.collection =  new Tasks(this.options.projectId);
      this.collection.bind('reset', this.render, this);
      this.collection.bind('search', this.searchResult, this);
    },

    searchResult: function(result){
      this.$el.html('');

      var template = this.template;
      var $list    = this.$el;
      var title;

      _.each(result, function(model){
        title = model.get('title');

        if(title){
          $list.append(template({title: model.get('title')}));
        }
      });
    },

    render: function(){
      this.$el.html('');

      var template = this.template;
      var $list    = this.$el;

      _.each(this.collection.models, function(model){
        $list.append(template({title: model.get('title')}));
      });
    }
  });

  return TaskController;

});
