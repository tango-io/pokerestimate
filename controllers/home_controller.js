module.exports = {

  index: function(req, res, next){
    res.render('index', {user: req.user ? req.user.email : null});
  }

};
