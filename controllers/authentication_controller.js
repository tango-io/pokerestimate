module.exports = {

  login: function(req, res, next, passport){

    switch(req.method){

      case 'POST':
        passport.authenticate('local', function(err, user, info) {

          if (err) { return next(err); }

          if (!user) { return res.send(info); }

          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send('Success');
          });

        })(req, res, next);
      break;

      default: res.render('/');

    }

  }


};
