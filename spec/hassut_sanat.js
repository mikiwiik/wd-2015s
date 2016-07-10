'use strict';

var path = require('path');
var expect = require('chai').expect;

var sanat = require(path.join(__dirname, '..', './hassut_sanat.js'));
describe('sanat()', function () {

    it('Removes <p> tags from single-line entry', function () {
        expect(
            sanat.parseText('<p>Hello World!</p>'))
            .to.equal('Hello World!');
    });

});
