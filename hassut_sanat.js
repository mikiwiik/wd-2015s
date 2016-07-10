var xpath = require('xpath'),
    dom = require('xmldom').DOMParser;

module.exports = {
    parseText: function (html) {
        var doc = new dom().parseFromString(html);
        var nodes = xpath.select("//p/text()", doc);
        return nodes.toString();
        // node.data = Hello World!
    }
};
