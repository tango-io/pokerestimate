define(['Backbone',], function( Backbone){

  var FilterController = Backbone.View.extend({

    events: {
      'keyup' : 'filter'
    },

    filter: function(event){
      var title  = event.currentTarget.value;
      var result = this.collection.search({title: title});
      this.collection.trigger('search', result);
    }

  });

  return FilterController;

});
