var pivotal  = require("../libs/pivotal");
var _        = require('lodash');
var inspect  = require('eyes').inspector({ stream: null });

module.exports = {
  projects: function(req, res, next){
    var token = req.user ? req.user.token : null;

    if(!token){
      res.send({error: 'Not logged in'});
      return false;
    }

    pivotal.getProjects({token: token}, function(error, data){
      if(error){res.send(error);}

      var projects = data.projects ? data.projects.project : [];

      var result = _.map(projects, function(project){
        return {
          name:   typeof project.name   === 'object' ? project.name.pop()   : project.name,
          id:     typeof project.id     === 'object' ? project.id.pop()     : project.id,
          public: typeof project.public === 'object' ? project.public.pop() : project.public,
        };
      });

      res.send(result);

    });
  },

  project: function(req, res, next){
    var token = req.user ? req.user.token : null;
    var id    = req.params.id;

    if(!token){
      res.send({error: 'Not logged in'});
      return false;
    }

    pivotal.getProjects({token: token, id: id}, function(error, data){
      if(error){res.send(error);}

      var project = _.map(data, function(field){
        return {
          name:   typeof field.name   === 'object' ? field.name.pop()   : field.name,
          id:     typeof field.id     === 'object' ? field.id.pop()     : field.id,
          public: typeof field.public === 'object' ? field.public.pop() : field.public
        };
      });

      res.send(project);

    });
  }
};
