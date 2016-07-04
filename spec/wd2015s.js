var path = require('path');
var expect = require('chai').expect;

var wd2015s = require(path.join(__dirname, '..', './wd2015s.js'));

describe('wd2015s()', function () {
    'use strict';

    it('exists', function () {
        expect(wd2015s).to.be.a('function');

    });

    it('does something', function () {
        expect(true).to.equal(false);
    });

    it('does something else', function () {
        expect(true).to.equal(false);
    });

    // Add more assertions here
});
