/*
 * Controllers
 */

var homeController = require('../controllers/home_controller');
var authenticationController = require('../controllers/authentication_controller');

/*
 * Routes
 */

module.exports = function(app, passport){

  app.get('/', homeController.index);

  app.all('/login', function(req, res, next){authenticationController.login(req, res, next, passport);});

};
