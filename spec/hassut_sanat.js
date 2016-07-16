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
            sanat.parseText('<p class="bt3">' +
                'Pukkila kävelee' +
                '</p>' +
                '<p class="bt1">Nipistetty mies</p>'))
            .to.deep.equal(['Pukkila kävelee', 'Nipistetty mies']);
    });
    it('Ignores non-<p> lines.', function () {
        expect(
            sanat.parseText('<h2 id="luku2">Toinen luku</h2>'))
            .to.deep.equal([]);
    });
});

describe('getWords()', function () {
    it('Whitespace is ignored.', function () {
        expect(
            sanat.getWords("\t This  is \n\t a     test\n\t"))
            .to.deep.equal(['This', 'is', 'a', 'test']);
    });
    it('Splits a string into words', function () {
        expect(
            sanat.getWords('Hello, Wörld!'))
            .to.deep.equal(['Hello', 'Wörld']);
    });

});

describe('getWords()', function () {
    it('no vowels gets 0 points', function () {
        expect(
            sanat.countPoints('jkl')).to.equal(0)
    });
    it('empty string gets 0 points', function () {
        expect(
            sanat.countPoints('')).to.equal(0)
    });
    it('ja gets 2 points', function () {
        expect(
            sanat.countPoints('ja')).to.equal(2)
    });
    it('koira gets 10 points', function () {
        expect(
            sanat.countPoints('Koira')).to.equal(10)
    });
    it('hääyöaie gets 896 points', function () {
        expect(
            sanat.countPoints('hääyöaie')).to.equal(896)
    });
});