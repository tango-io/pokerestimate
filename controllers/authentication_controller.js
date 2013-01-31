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

          if (!user) { return res.send(info); }

          req.logIn(user, function(err) {
            if (err) { return next(err); }
            var userEmail = req.user ? req.user.email : null;
            return res.redirect('/');
            // return res.send('Success', userEmail);
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
