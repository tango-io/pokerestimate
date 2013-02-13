define([

  'Backbone',

  //Model
  'app/models/project',

  //Collection
  'app/collections/projects',

  //View
  'app/views/taskController',
  'app/views/projectsController',
  'app/views/filterController',

  //Templates
  'text!templates/project-page/gamePageTemplate.html',
  'text!templates/project-page/errorTemplate.html'

], function(

  Backbone,

  //Model
  Project,

  //Collection
  Projects,

  //Views
  taskController,
  projectsController,
  filterController,

  //Templates
  gamePageTemplate,
  errorTemplate
){

  var ProjectManager = Backbone.View.extend({

    template: _.template(gamePageTemplate),
    errorTemplate: _.template(errorTemplate),

    model: new Project(),

    initialize: function(){
      this.model.clear({silent: true}).off();
      this.model.bind('change:error', this.error, this);
      this.model.bind('change:name', this.render, this);

      this.model.fetch({data: {id: this.options.projectId}});

      this.projectsList = new projectsController({
        collection: new Projects(),
        router: this.options.router
      });

      this.taskList = new taskController({
        projectId: this.options.projectId
      });

      this.filter = new filterController({
        collection: this.taskList.collection
      });
    },

    error: function(){
      var message = this.model.get('error');
      this.$el.html(this.errorTemplate({message: message}));
    },

    render: function(){
      this.$el.html(this.template({project: {name: this.model.get('name')}}));
      this.taskList.setElement('.js-taskList');
      this.taskList.collection.fetch();

      if(!$('.projects-list li')[0]){
        this.projectsList.setElement('.projects-list').start();
      }

      this.filter.setElement('.fn-filter-task');
    }
  });

  return ProjectManager;

});
