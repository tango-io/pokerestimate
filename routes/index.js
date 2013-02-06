/*
 * Controllers
 */

var homeController = require('../controllers/home_controller');
var authController = require('../controllers/authentication_controller');

/*
 * Routes
 */

module.exports = function(app, passport){

  var authenticate = authController.setUp(authController, passport);

  app.get('/', homeController.index);

  app.post('/login', authenticate);
  app.get('/logout',authController.logout);

};
