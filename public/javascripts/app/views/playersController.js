define([ 

  'Backbone',

  'text!templates/project-page/playerTemplate.html'
], function( 

  Backbone,

  playerTemplate
){

  var PlayersController = Backbone.View.extend({

    template: _.template(playerTemplate),

    initialize: function(){
      this.collection.off();

      this.collection.on('add remove', this.render, this);
      this.options.project.on('change', this.render, this);
    },


    render: function(){
      this.$('.list').html('');
      var template = this.template;
      var project  = this.options.project.get('name');
      var players  = this.collection.where({project: project});
      var $list    = this.$('.list');

      _.each(players, function(player){
        $list.append(template({player: player.get('email')}));
      });

      //Display last message
      this.options.socket.message.trigger('change');
    }
  });

  return PlayersController;
});
