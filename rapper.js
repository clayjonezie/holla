var fs = require('fs');

var wordsDB = [];
var phenomesForRhyme = 4;

function load(callback) {
    fs.readFile('mobypron.unc.short', 'utf8', function(err, data) {
        var lines = data.split('\r');
        lines.forEach(function(elem, index) {
            var line = elem.split(' ');
            var word = {word: wordFrom(line[0]), pron: pronObjFrom(line[1])};
            wordsDB.push(word);
        });
        return callback();
    });
}

exports.findPron = function(word, callback) {
    load(function() {
        for(var i = 0; i < wordsDB.length; i++) {
            if (wordsDB[i].word == word) {
                callback(wordsDB[i].pron);
                break;
            }
        }
    });
};

exports.findRhymes = function(word, callback) {
    load(function() {
        var wordObj = getWordFromDB(word);
        var rhymes = [];
        for (var i = 0; i < wordsDB.length; i++) {
            if (wordObj.word != wordsDB[i].word) {
                var comp = compareArrayEnds(wordObj.pron.phenomes, wordsDB[i].pron.phenomes);
                if (comp >= phenomesForRhyme && !wordsAreComposition(wordObj.word, wordsDB[i].word)) {
                    rhymes.push(wordsDB[i].word);
                }
            }
        }
        callback(rhymes);
    }); 
};

function wordsAreComposition(word1, word2) {
    var word1Ending = word1.split(/[\-_]/)[1] || word1;
    var word2Ending = word2.split(/[\-_]/)[1] || word2;
    return word1Ending == word2Ending;
}

function compareArrayEnds(array1, array2) {
    var length1 = array1.length;
    var length2 = array2.length;
    var comp = 0;
    for(var i = 1; i < length1 + 1; i++) {
        if (array1[length1 - i] != array2[length2 - i]) {
            break;
        } else {
            comp++;
        }
    }
    return comp;
}

function wordFrom(word) {
    return word.split('/')[0];
}

function pronObjFrom(pron) {
    var phenomesWithStress = removeEmpty(pron.split(/[\/_]/));
    return {
        phenomes: removeStressSymbols(phenomesWithStress),
        syllables: 0, //NYI
        primaryStress: indexOfElementWith('\'', phenomesWithStress),
        secondaryStress: indexOfElementWith(',', phenomesWithStress),
    };
}

function indexOfElementWith(search, array) {
    for (var i = 0; i < array.length; i ++) {
        if (array[i].indexOf(search) > -1) {
            return i;
        }
    }
}

function removeStressSymbols(array) {
    var ret = [];
    for (var i = 0; i < array.length; i++) {
        ret[i] = array[i].replace(/[\',]/,'');
    }
    return ret;
}

function removeEmpty(array) {
    return array.filter(function(elem) {
        return elem !== '';
    });
}

function getWordFromDB(word) {
    for (var i = 0; i < wordsDB.length; i++) {
        if (wordsDB[i].word == word) {
            return wordsDB[i];
        }
    }
}