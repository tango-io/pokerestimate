module.exports = {
  projects: function(req, res, next){
    res.send([{name: 'one'}, {name: 'two'}, {name: 'three'}]);
  }
};
