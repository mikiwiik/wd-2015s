var xpath = require('xpath'),
    dom = require('xmldom').DOMParser;

module.exports = {
    parseText: function (html) {
        var doc = new dom().parseFromString(html);
        return xpath.select("//p/text()", doc)
            .map(function (node) {
                return node.data;
            });
    },
    getWords: function (string) {
        // Note JS does not support unicode \W
        return string
            .split(/[\s,.!?-]+/g)
            // Remove empty cells (most likely due to trailing punctuation marks)
            .filter(function (value) {
                return value.length > 0;
            });
    },
    countPoints: function (word) {
        var points = 0;
        var matches = word.match(/([^qwrtpsdfghjklzxcvbnm]+)/gi);
        if (matches) {
            matches.forEach(function (group) {
                var n = group.length;
                points += n * Math.pow(2, n);
            });
        }
        return points;
    }
};
