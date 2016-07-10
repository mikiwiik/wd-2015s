'use strict';

var path = require('path');
var expect = require('chai').expect;

var sanat = require(path.join(__dirname, '..', './hassut_sanat.js'));
describe('parseText()', function () {

    it('Removes <p> tags from single-line entry', function () {
        expect(
            sanat.parseText('<p>Hello World!</p>'))
            .to.deep.equal(['Hello World!']);
    });
    it('Multi-line <p>:s are returned as line per array element.', function () {
        expect(
            sanat.parseText('<h2 id="luku2">Toinen luku</h2>' +
                '<p class="bt3">' +
                'Pukkila kävelee' +
                '</p>' +
                '<p class="bt1">Nipistetty mies</p>'))
            .to.deep.equal(['Pukkila kävelee', 'Nipistetty mies']);
    });
});

describe('getWords()', function () {
    it('Splits a string into words', function () {
        expect(
            sanat.getWords('Hello, Wörld!'))
            .to.deep.equal(['Hello', 'Wörld']);
        // Fails. Returns array with a final empty element, most likely due to the !
    });

});
