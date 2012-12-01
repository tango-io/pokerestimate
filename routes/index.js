/*
 * Routes
 */

var homeController = require('../controllers/home_controller');


module.exports = function(app){

  app.get('/', homeController.index);

};
