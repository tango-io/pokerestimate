define([

  'Backbone',

  //Collection
  'app/collections/games',

  //Template
  'text!templates/project-page/gameTemplate.html',
], function(

  Backbone,

  //Collection
  Games,

  //Template
  gameTemplate
){

  var GameController = Backbone.View.extend({

    template: _.template(gameTemplate),

    events: {
      'keyup .js-create-game' : 'create',
      'click .js-editGame'    : 'editGame',
      'keyup .js-edit'        : 'edit'
    },

    initialize: function(){
      this.collection = new Games(this.options.projectId);
      this.collection.bind('add', this.addGame, this);
      this.collection.bind('reset', this.render, this);
    },

    guid: function(){
      var S4 = function (){ return (((1+Math.random())*0x10000)|0).toString(16).substring(1); };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },

    create: function(event){
      if(event.keyCode === 13){
        this.collection.create({
          _id: this.guid(),
          name: event.currentTarget.value, 
          projectId: this.options.projectId
        });

        event.currentTarget.value='';
      }
    },

    addGame: function(newModel){
      var newGame = newModel.toJSON();
      this.$el.append(this.template(newGame));
    },

    editGame: function(event){
      var $target  = $(event.currentTarget);
      var $element = $target.siblings('.name');
      var input    = document.createElement('input');
      var $input   = $(input);

      input.value = $element.text();
      $input.addClass('js-edit');

      $element.replaceWith(input);
      input.focus();
    },

    edit: function(event){
      if(event.keyCode === 13){
        var $target = $(event.currentTarget);
        var span    = document.createElement('span');
        var $span   = $(span);
        var model   = this.collection.get($target.parent().attr('data-id')); 

        $span.text($target.val());
        $span.addClass('name');

        $target.replaceWith(span);

        model.save({
          name: $target.val(),
          project_id: this.options.projectId
        });
      }
    },

    render: function(){
      var template = this.template;
      var $list = this.$el;

      _.each(this.collection.models, function(model){
        var game = template(model.toJSON());
        $list.append(game);
      });
    }

  });

  return GameController;

});
