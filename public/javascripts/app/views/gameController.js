define([

  'Backbone',

  //Collection
  'app/collections/games'

], function(

  Backbone,

  Games

){

  var GameController = Backbone.View.extend({

    events: {
      'keyup .js-create-game' : 'create'
    },

    initialize: function(){
      this.collection = new Games(this.options.projectId);
      this.collection.bind('add', this.addGame, this);
      this.collection.bind('reset', this.render, this).fetch();
    },

    create: function(event){
      if(event.keyCode === 13){
        this.collection.create({
          name: event.currentTarget.value, 
          projectId: this.options.projectId
        });
      }
    },

    addGame: function(){
      console.log(this.collection);
    },

    render: function(){
      console.log(this.collection);
    }

  });

  return GameController;

});
