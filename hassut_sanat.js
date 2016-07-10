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
        return string.split(/[\s,.!?-]+/g);
    }
};
