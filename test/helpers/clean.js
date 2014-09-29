"use strict";

var clean = require('../../lib/helpers/parse.js');



describe.skip('Clean()', function() {

  it('should remove useless values', function(done) {

    var data = {
      B1: {
        v: 'useful',
        ixfe: 'useless'
      },
    };

    var cleanData = {
      B1: 'useful'
    };

    clean(data).should.be.eql(cleanData);
    done();
  });


  it('should remove dates values', function(done) {

    var data = {
      B1: {v : 'useful'},
      B2: {v: 41205},
    };

    var cleanData = {
      B1: 'useful'
    };

    clean(data).should.be.eql(cleanData);
    done();
  });

  it('should remove !merges values', function(done) {

    var data = {
      B1: {v : 'useful'},
      '!merges': ['a random list']
    };

    var cleanData = {
      B1: 'useful'
    };

    clean(data).should.be.eql(cleanData);
    done();
  });

  it('should remove !objects values', function(done) {

    var data = {
      B1: {v : 'useful'},
      '!objects' : ['a random list']
    };

    var cleanData = {
      B1: 'useful'
    };

    clean(data).should.be.eql(cleanData);
    done();
  });
});