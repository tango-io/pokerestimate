module.exports = {

  setUp: function(self, passport){
    return function(){
      Array.prototype.push.call(arguments, passport);
      self.login.apply(this, arguments);
    };
  },

  login: function(req, res, next, passport){

    switch(req.method){

      case 'POST':
        passport.authenticate('local', function(err, user, info) {

          if (err) { return next(err); }

          if (!user) { 
            if(info){ return res.send(info); }

            //TODO Need to improve this
            return res.redirect('/');
          }

          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
          });

        })(req, res, next);
      break;

      default: return res.redirect('/');

    }

  },

  logout: function(req, res){
    req.logout();
    res.redirect('/');
  }


};
