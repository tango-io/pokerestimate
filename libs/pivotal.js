var http        = require('http');
var https       = require('https');
var inspect     = require('eyes').inspector({ stream: null });
var querystring = require('querystring');
var xml2js      = require('xml2js');
var noAccess    = new RegExp(/Access denied/); 

var RequestOptions = function(method){
    this.host = 'www.pivotaltracker.com';
    this.port =  80;
    this.method = method || 'POST';
};

RequestOptions.prototype.extend = function(field, value){
  this[field] = value;
};


module.exports.access = function(data, callback){
  var parser     = new xml2js.Parser();
  var stringData = querystring.stringify(data);
  var options    = new RequestOptions();

  options.extend('port', 443);
  options.extend('path', '/services/v3/tokens/active');
  options.extend('headers', {
    'Content-Type': 'application/x-www-form-urlencoded',  
    'Content-Length': stringData.length  
  });

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
  var parser  = new xml2js.Parser();
  var id      = data.id ? '/' + data.id : '';
  var options = new RequestOptions('GET');

  options.extend('path', '/services/v3/projects' + id);
  options.extend('headers', {'X-TrackerToken': data.token});

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
  var parser  = new xml2js.Parser();
  var options = new RequestOptions('GET');

  options.extend('path', '/services/v3/projects/'+data.project+'/stories');
  options.extend('headers', { 'X-TrackerToken': data.token });

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
