var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;

function parseText(html) {
    var doc = new dom().parseFromString(html);
    var nodes = xpath.select("//p/text()", doc);
    return nodes.toString();
}

module.exports = parseText;