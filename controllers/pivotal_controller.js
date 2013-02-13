var pivotal  = require("../libs/pivotal");
var _        = require('lodash');
var inspect  = require('eyes').inspector({ stream: null });

module.exports = {
  projects: function(req, res, next){
    var id    = req.query.id;
    var token = req.user ? req.user.token : null;

    if(!token){
      res.send({error: 'Not logged in'});
      return false;
    }

    pivotal.getProjects({token: token, id: id}, function(error, data){

      if(error){
        res.send(error);
        return false;
      }

      if(data.message){
        res.send(data);
        return false;
      }

      var projects = data.projects ? data.projects.project : data;

      var result = _.map(projects, function(project){
        return {
          name:   typeof project.name   === 'object' ? project.name.pop()   : project.name,
          id:     typeof project.id     === 'object' ? project.id.pop()     : project.id,
          public: typeof project.public === 'object' ? project.public.pop() : project.public,
        };
      });

      if(id){
        result = result.pop();
      }

      res.send(result);

    });
  },

  tasks: function(req, res, next){
    var token   = req.user ? req.user.token : null;
    var project = req.params.project;

    if(!token){
      res.send({error: 'Not logged in'});
      return false;
    }

    pivotal.getTasks({project: project, token: token}, function(error, data){

      if(error){
        res.send(error);
        return false;
      }

      if(data.message){
        res.send(data);
        return false;
      }

      var stories = typeof data.stories === 'object' ? data.stories.story : [];

      var list = _.map(stories, function(field){

        var points = field.estimate ? field.estimate.pop()._ : 'bug';

        return points === '-1' ? {
          id:           field.id.pop()._,
          project_id:   field.project_id.pop()._,
          title:        field.name.pop(),
          url:          field.url.pop(),
          description:  field.description.pop(),
          requested_by: field.requested_by.pop(),
          owned_by:     field.owned_by ? field.owned_by.pop() : field.owned_by,
          labels:       field.labels
        } : false;

      });

      res.send(_.compact(list));

    });
  },

  task: function(req, res, next){
    var token   = req.user ? req.user.token : null;
    var project = req.params.project;
    var id      = req.params.id;

    if(!token){
      res.send({error: 'Not logged in'});
      return false;
    }

    pivotal.getTasks({project: project, token: token, id: id}, function(error, data){

      if(error){
        res.send(error);
        return false;
      }

      if(data.message){
        res.send(data);
        return false;
      }

      var storie = _.map(data, function(field){
        return {
          id:           field.id.pop()._,
          project_id:   field.project_id.pop()._,
          title:        field.name.pop(),
          url:          field.url.pop(),
          description:  field.description.pop(),
          requested_by: field.requested_by.pop(),
          owned_by:     field.owned_by ? field.owned_by.pop() : field.owned_by,
          labels:       field.labels
        };
      }).pop();

      res.send(storie);

    });
  }

};
