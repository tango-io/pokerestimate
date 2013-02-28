/*
 * Controllers
 */

var homeController     = require('../controllers/home_controller');
var pivotalController  = require('../controllers/pivotal_controller');
var authController     = require('../controllers/authentication_controller');
var userController     = require('../controllers/user_controller');

/*
 * Routes
 */

module.exports = function(app, passport){

  var authenticate = authController.setUp(authController, passport);

  app.get('/', homeController.index);

  app.post('/login', authenticate);
  app.get('/logout', authController.logout);

  app.get('/api/v1/me', userController.me);

  app.get('/api/v1/projects',     pivotalController.projects);

  app.get('/api/v1/projects/:project/tasks',     pivotalController.tasks);
  app.put('/api/v1/projects/:project/tasks/:id', pivotalController.saveTask);
  app.delete('/api/v1/projects/:project/tasks/:id', pivotalController.deleteTask);
};
