var http        = require('http');
var https       = require('https');
var inspect     = require('eyes').inspector({ stream: null });
var querystring = require('querystring');
var xml2js      = require('xml2js');
var noAccess    = new RegExp(/Access denied/); 

module.exports.access = function(data, callback){
  var parser     = new xml2js.Parser();
  var stringData = querystring.stringify(data);

  var options = {
    host: 'www.pivotaltracker.com',
    port: 443,
    path: '/services/v3/tokens/active',
    method: 'POST',
    headers: {  
      'Content-Type': 'application/x-www-form-urlencoded',  
      'Content-Length': stringData.length  
    }  
  };

  var req = https.request(options, function(res) {
    res.on('data', function(d) {

      if(noAccess.test(d.toString())){
        return callback.call(this, null, {message: d.toString()});
      }

      parser.parseString(d, function (err, result) {
        return callback.call(this, err, result);
      });

    });

  });

  req.write(stringData);
  req.end();

  req.on('error', function(e) {
    return callback.call(this, e);
  });

};

module.exports.getProjects = function(data, callback){
  var parser = new xml2js.Parser();
  var id = data.id ? '/' + data.id : '';

  var options = {
    host: 'www.pivotaltracker.com',
    port: 80,
    path: '/services/v3/projects' + id,
    method: 'GET',
    headers: {  
      'X-TrackerToken': data.token
    }  
  };

  parser.addListener('end', function(result) {
    return callback(null, result);
  });

  var req = http.request(options, function(res) {
    res.on('data', function(d) {

      if(noAccess.test(d.toString())){
        return callback.call(this, null, {message: d.toString()});
      }

      parser.parseString(d);
    });

  });

  req.end();

  req.on('error', function(e) {
    return callback(err);
  });

};

module.exports.getTasks = function(data, callback){
  var parser = new xml2js.Parser();

  var options = {
    host: 'www.pivotaltracker.com',
    port: 80,
    path: '/services/v3/projects/'+data.project+'/stories',
    method: 'GET',
    headers: {  
      'X-TrackerToken': data.token
    }  
  };

  parser.addListener('end', function(result) {
    return callback(null, result);
  });

  var req = http.request(options, function(res) {
    res.on('data', function(d) {

      if(noAccess.test(d.toString())){
        return callback.call(this, null, {message: d.toString()});
      }

      parser.parseString(d);
    });

  });

  req.end();

  req.on('error', function(e) {
    return callback(err);
  });
  
};
