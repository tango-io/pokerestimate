module.exports = {

  index: function(req, res, next){
    res.render('index');
  },

  landing: function(req, res, next){
    res.render('landing_page');
  }

};
