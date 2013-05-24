define([

  'Backbone',

  //Collection
  'app/collections/tasks',

  //View
  'app/views/taskItemView',
  'app/views/taskDetail',

  //Template
  'text!templates/project-page/taskItemTemplate.html',
], function(

  Backbone,

  //Collection
  Tasks,

  //View
  taskItemView,
  TaskDetail,

  //Template
  itemTemplate
){

  var TaskController = Backbone.View.extend({

    template: _.template(itemTemplate),

    initialize: function(){
      this.collection =  new Tasks(this.options.projectId);
      this.collection.bind('reset add remove change', this.render, this);
      this.collection.bind('search', this.searchResult, this);

      this.taskDetail = new TaskDetail({
        collection: this.collection,
        router: this.options.router
      });

    },

    searchResult: function(result){
      this.$el.html('');

      var template = this.template;
      var $list    = this.$el;
      var title, task;

      _.each(result, function(model){
        title = model.get('title');

        if(title){
          task = new taskItemView({ model: model });
          $list.append(task.el);
        }
      });
    },

    render: function(){
      this.$el.html('');

      var template = this.template;
      var $list    = this.$el;
      var task;

      _.each(this.collection.models, function(model){
        task = new taskItemView({ model: model });
        $list.append(task.el);
      });
    }
  });

  return TaskController;

});
