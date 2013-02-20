define([

  'Backbone',

  //Template
  'text!templates/project-page/taskItemTemplate.html',
  'text!templates/project-page/informationTemplate.html',

  'bootstrap'
], function(

  Backbone,

  //Template
  itemTemplate,
  informationTemplate

){

  var TaskItemView = Backbone.View.extend({

    template: _.template(itemTemplate),
    information: _.template(informationTemplate),

    events: {
      'click' : 'selected'
    },

    initialize: function(title){
      this.$el.html(this.template({title: this.model.get('title')}));

      this.$('li').popover({
        title: this.model.get('title'),
        trigger: 'hover',
        content: ' ',
        template: this.information(this.model.toJSON())
      });

      return this;
    },

    selected: function(event){
      var $target = $(event.currentTarget).find('li');
      $target.toggleClass('selected');
    }

  });

  return TaskItemView;
});
