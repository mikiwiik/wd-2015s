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

    it('number string gets 0 points', function () {
        expect(
            sanat.countPoints('1933')).to.equal(0)
    });
    it('Fraction gets 0 points', function () {
        expect(
            sanat.countPoints('(1/16)')).to.equal(0)
    });
    it('Apostrophe gets 0 points', function () {
        expect(
            sanat.countPoints('’')).to.equal(0)
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

describe('processWord()', function () {
    describe('Adding words of equal points', function () {
        before(function () {
            sanat.processWord('ja', 1);
            sanat.processWord('jo', 2);
        });
        it('Adding a word of equal amount of points should retain the previous word', function () {
            expect(sanat.highScore.words)
                .to.deep.equal([
                {word: 'ja', chapter: 1},
                {word: 'jo', chapter: 2}
            ]);
        });
    });

    describe('Adding words of higher points', function () {
        before(function () {
            sanat.processWord('ja', 1);
            // joo = 8 points
            sanat.processWord('joo', 2);
        });

        it('Adding a word of higher points should set the points to the higher', function () {
            expect(sanat.highScore.points)
                .to.equal(8);
        });
        it('Adding a word of higher points should remove any previous words', function () {
            expect(sanat.highScore.words)
                .to.deep.equal([
                {word: 'joo', chapter: 2}
            ]);
        });
    });
});