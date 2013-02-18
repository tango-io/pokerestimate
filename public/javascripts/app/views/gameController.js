define([

  'Backbone',

  //Collection
  'app/collections/games',

  //Template
  'text!templates/project-page/gameTemplate.html',
  'text!templates/modalTemplate.html',

  'reveal'
], function(

  Backbone,

  //Collection
  Games,

  //Template
  gameTemplate,
  modalTemplate
){

  var GameController = Backbone.View.extend({

    template: _.template(gameTemplate),
    modal: _.template(modalTemplate),

    events: {
      'keyup .js-create-game' : 'create',
      'click .js-editGame'    : 'editGame',
      'keyup .js-edit'        : 'edit',
      'click .js-removeGame'  : 'destroy',
      'click .js-confirm'     : 'removeGame',
      'click .js-cancel'      : 'cancel'
    },

    initialize: function(){
      this.collection = new Games(this.options.projectId);
      this.collection.bind('reset', this.render, this);

      socket.on('populate game', this.addGame.call(this));
      socket.on('updated game', this.updateGame.call(this));
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
          project_id: this.options.projectId
        });

        event.currentTarget.value='';
      }
    },

    addGame: function(){
      var view = this;
      return function(error, game){
        if(error){console.log(error); return false;}
        view.$el.append(view.template(game));
      };
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

        var game = {
          _id: $(event.currentTarget).parent().attr('data-id'),
          name: event.currentTarget.value,
          project_id: this.options.projectId
        };

        socket.emit('update game', game);
      }
    },

    updateGame: function(){

      return function(error, game){
        var $target = $('[data-id='+game._id+']');
        var $input  = $target.find('.js-edit');
        var span    = document.createElement('span');
        var $span   = $(span);

        $span.text(game.name);
        $span.addClass('name');

        if($input[0]){
          $input.replaceWith(span);
        }else{
          $target.find('.name').text(game.name);
        }

      };

    },

    destroy: function(event){
      var $target = $(event.currentTarget);
      var name    = $target.siblings('.name').text();
      var model   = this.collection.get($target.parent().attr('data-id')); 

      this.$('.reveal-modal .lead').text(name);
      this.$('.reveal-modal').data('model', model);
      this.$('.reveal-modal').reveal();
    },

    removeGame: function(event){
      event.preventDefault();
      var model = this.$('.reveal-modal').data('model');
      var id    = model.get('_id');
      var item  = this.$('.item[data-id='+id+']');
      var modal = this.$('.reveal-modal');

      modal.removeData('model');

      var request = model.destroy({
        contentType: "application/json",
        url: '/api/v1/games/remove',
        data: JSON.stringify({_id: id})
      });

      request.done(function(){
        item.remove();
        modal.trigger('reveal:close');
      });

    },

    cancel: function(event){
      event.preventDefault();
    },

    render: function(){
      var template = this.template;
      var $list = this.$el;

      this.$el.append(this.modal({
        title: 'Destroy Game',
        message: 'Are you sure ?'
      }));

      _.each(this.collection.models, function(model){
        var game = template(model.toJSON());
        $list.append(game);
      });
    }

  });

  return GameController;

});
