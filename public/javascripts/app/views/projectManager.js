define([

  'Backbone',

  //Model
  'app/models/project',

  //View
  'app/views/taskController',

  //Templates
  'text!templates/project-page/gamePageTemplate.html',
  'text!templates/project-page/errorTemplate.html'

], function(

  Backbone,

  //Model
  Project,

  //Views
  taskController,

  //Templates
  gamePageTemplate,
  errorTemplate
){

  var ProjectManager = Backbone.View.extend({

    template: _.template(gamePageTemplate),
    errorTemplate: _.template(errorTemplate),

    model: new Project(),

    initialize: function(){
      this.model.clear({silent: true});
      this.model.bind('change:error', this.error, this);
      this.model.bind('change:name', this.render, this);

      this.model.fetch({data: {id: this.options.projectId}});

      this.taskList = new taskController({
        projectId: this.options.projectId
      });
    },

    error: function(){
      var message = this.model.get('error');
      this.$el.html(this.errorTemplate({message: message}));
    },

    render: function(){
      this.$el.html(this.template({project: {name: this.model.get('name')}}));
      this.taskList.setElement('.fn-taskList');
      this.taskList.collection.fetch();
    }
  });

  return ProjectManager;

});
