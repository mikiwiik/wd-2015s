#!/usr/bin/env node

var epubfile = 'Alastalon-Salissa.epub';

var EPub = require("epub"),
    sanat = require('./hassut_sanat');

var epub = new EPub(epubfile, "images", "chapters"),
    wordCount = 0;

epub.on("end", function () {
    epub.flow.forEach(function (chapter) {
        epub.getChapter(chapter.id, function (error, text) {
            sanat.parseText(text).forEach(function (paragraph) {
                sanat.getWords(paragraph).forEach(function (word) {
                        sanat.processWord(word, chapter.id);
                    wordCount++;
                    }
                );
            });
        })
    });

});

process.on('exit', function (code) {
    console.log('Processed ' + wordCount + ' words in ' + epubfile + '\n' +
        'Highest score, ' + sanat.highScore.points + ', points awarded to:\n' +
        sanat.highScore.onlyWords()
    );
    process.exit(code);
});

epub.parse();