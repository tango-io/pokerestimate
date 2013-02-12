define(['Backbone'], function(Backbone){

  var Account = Backbone.Model.extend({

    url: 'api/v1/me',

    login: function(data, cb){
      this.url = "/login";
      this.fetch({data: data, type: "POST"});
    },

    logout: function(){
      this.url = "/logout";
      this.fetch();
    }

  });

  return Account;
});

