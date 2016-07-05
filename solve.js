#!/usr/bin/env node

var EPub = require("epub");

var epubfile = 'Alastalon-Salissa.epub';

var epub = new EPub(epubfile, "images", "chapters");
epub.on("end", function () {
    epub.flow.forEach(function (chapter) {
        epub.getChapter(chapter.id, function (error, text) {
            console.log(text);
        })
    });
});
epub.parse();
