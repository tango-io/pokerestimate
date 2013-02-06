var pivotal  = require("../libs/pivotal");
var inspect  = require('eyes').inspector({ stream: null });

module.exports = {
  projects: function(req, res, next){
    var token = req.user ? req.user.token : null;

    pivotal.getProjects(token, function(error, data){
      console.log(inspect(data));
    });

    res.send([{name: 'one'}, {name: 'two'}, {name: 'three'}]);
  }
};
