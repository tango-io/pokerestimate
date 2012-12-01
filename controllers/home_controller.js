module.exports = {

  index: function(req, res, next){
    res.render('index');
  },

  login: function(req, res){
    res.redirect('/');
  }

};
