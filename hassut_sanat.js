var xpath = require('xpath'),
    dom = require('xmldom').DOMParser;

module.exports = {
    /**
     * Parses the contents of <p> tags from provided HTML.
     * @param html
     * @returns {Array} <p> contents as entries.
     */
    parseText: function (html) {
        var doc = new dom().parseFromString(html);
        return xpath.select("//p/text()", doc)
            .map(function (node) {
                return node.data;
            });
    },
    /**
     * Split all words from provided sentence string.
     * @param string
     * @returns {Array.<string>|*} of found words.
     */
    getWords: function (string) {
        // Note JS does not support unicode \W
        return string
            .split(/[\s,.!?-]+/g)
            // Remove empty cells (most likely due to trailing punctuation marks)
            .filter(function (value) {
                return value.length > 0;
            });
    },
    /**
     * Count the hassuus of the given word
     * @param word
     * @returns {number} Hassuus score
     */
    countPoints: function (word) {
        var points = 0;
        var matches = word.match(/([^0-9/()’qwrtpsdfghjklzxcvbnm]+)/gi);
        if (matches) {
            matches.forEach(function (group) {
                var n = group.length;
                points += n * Math.pow(2, n);
            });
        }
        return points;
    }
};
