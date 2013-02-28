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

    var list = {};

    process.database.tasks.find({project_id: project}, function(err, tasks){
      tasks.toArray(function(err, elements){
        _.each(elements, function(element){
          list[element.id] = element;
        });
      });
    });

    pivotal.getTasks({project: project, token: token}, function(error, data){
      if(error){ res.send(error); return false; }

      if(data.message){ res.send(data); return false; }

      var stories = typeof data.stories === 'object' ? data.stories.story : [];

      _.each(stories, function(storie, index){
        var points = storie.estimate ? storie.estimate.pop()._ : 'bug';

        if(points === '-1'){
          var id = storie.id.pop()._;

          var data = {
            id:           id,
            project_id:   storie.project_id.pop()._,
            title:        storie.name.pop(),
            url:          storie.url.pop(),
            description:  storie.description.pop(),
            requested_by: storie.requested_by.pop(),
            owned_by:     storie.owned_by ? storie.owned_by.pop() : storie.owned_by,
            labels:       storie.labels
          };

          list[id] = list[id] ? _.extend(list[id], data) : data;
        }

        if(index === stories.length - 1){
          var result = _.map(list, function(t){return t;});
          res.send(result);
        }
      });

    });

  },

  saveTask: function(req, res, next){
    var estimated  = req.body.estimated;
    var token      = req.user ? req.user.token : null;
    var project    = req.params.project;
    var id         = req.params.id;

    if(!token){
      res.send({error: 'Not logged in'});
      return false;
    }

    process.database.tasks.update({id: id}, { $set: { 
      project_id: project,
      estimated:  estimated
    } }, { upsert: true }, function(){
      res.send({success: true});
    });

  },

  deleteTask: function(req, res, next){
    var project = req.params.project;
    var token   = req.user ? req.user.token : null;
    var id      = req.params.id;
    var point   = req.body.result;

    if(!token){
      res.send({error: 'Not logged in'});
      return false;
    }

    process.database.tasks.remove({id: id}, function(){ });

    pivotal.estimate({project: project, id: id, point: point, token: token}, function(error, data){
      console.log(inspect(data));

      if(error){
        res.send(error);
        return false;
      }

      if(data.message){
        res.send(data);
        return false;
      }

      res.send(data);
    });

  }

};
