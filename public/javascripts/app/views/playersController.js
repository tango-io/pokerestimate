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
      this.options.message.off();

      this.collection.on('add remove', this.render, this);
      this.options.project.on('change', this.render, this);
      this.options.message.on('change', this.showMessage, this);
    },

    showMessage: function(){
      var message = this.options.message.get('message');
      this.$('.js-message').text(message);
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
    }
  });

  return PlayersController;
});
