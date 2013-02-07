var should  = require('should');
var pivotal = require('../../libs/pivotal');

describe('pivotal library', function(){
  it('should have get projects function', function(){
    should.exist(pivotal.getProjects);
  });

  describe('get projects', function(){

    before(function(){
      this.token = '030dc511e7f718b60f0372a855b77227';
    });

    it('responds with an array of projects', function(done){
      pivotal.getProjects(this.token , function(err, data){
        data.should.be.a('object');
        done();
      });
    });

  });

});
