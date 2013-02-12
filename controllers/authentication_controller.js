module.exports = {

  setUp: function(self, passport){
    return function(){
      Array.prototype.push.call(arguments, passport);
      self.login.apply(this, arguments);
    };
  },

  login: function(req, res, next, passport){

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }

      if (!user) { 
        if(info){ return res.send(info); }
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({user: user.email});
      });

    })(req, res, next);

  },

  logout: function(req, res){
    req.session.destroy();
    res.send({user: false});
  }


};
