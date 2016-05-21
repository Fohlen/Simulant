var expect = require('chai').expect;

// Only test against a default rule
var defaultRule = require('../src/Attributes/Rules/Default');

// Currently we only test Oxygen
var Oxygen = require('../src/Attributes/Oxygen');


describe('Attribute', function() {
    describe('Oxygen', function() {
       it('Should be an object of type Attribute', function() {
           ox = new Oxygen(defaultRule);
           expect(ox).to.have.property('rule').that.is.a('function');
       });
    });
});


