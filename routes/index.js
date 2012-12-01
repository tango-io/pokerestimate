/*
 * Routes
 */

var homeController = require('../controllers/home_controller');


module.exports = function(app, passport){

  app.get('/', homeController.index);

  app.post('/login', 
           passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
           homeController.login);

};
