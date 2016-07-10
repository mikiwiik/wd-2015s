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

    it('Splits a string into words', function () {
        expect(
            sanat.getWords('Hello, Wörld'))
            .to.deep.equal(['Hello', 'Wörld']);
    });

});
