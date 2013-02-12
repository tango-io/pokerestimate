module.exports = {

  me: function(req, res, next){
    var user = {
      user: req.user ? req.user.email : false
    };

    res.send(user);
  }

};
