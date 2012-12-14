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
            return res.send('Success', req.user);
          });

        })(req, res, next);
      break;

      default: res.render('/');

    }

  }


};
