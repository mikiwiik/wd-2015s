#!/usr/bin/env node

var epubfile = 'Alastalon-Salissa.epub';

var EPub = require("epub"),
    sanat = require('./hassut_sanat');

var epub = new EPub(epubfile, "images", "chapters");
epub.on("end", function () {
    epub.flow.forEach(function (chapter) {
        epub.getChapter(chapter.id, function (error, text) {
            sanat.parseText(text).forEach(function (paragraph) {
                sanat.getWords(paragraph).forEach(function (word) {
                        sanat.processWord(word, chapter.id);
                    }
                );
            });
        })
    });
});

epub.parse();