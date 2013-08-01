var fs = require('fs');

var wordsDB = [];

function load(callback) {
    fs.readFile('mobypron.unc.short', 'utf8', function(err, data) {
        var lines = data.split('\r');
        lines.forEach(function(elem, index) {
            var line = elem.split(' ');
            var word = {word: wordFrom(line[0]), pron: pronTreeFrom(line[1])};
            wordsDB.push(word);
        });
        wordsDB.pop();
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

};

function compareArrayEnds(array1, array2) {
    var length1 = array1.length;
    var length2 = array2.length;
    var comp = 0;
    for(var i = 1; i < length1 + 1; i++) {
        if (array1[length1 - i] == array2[length2 - i]) {
            console.log('match');
            comp++;
        }
    }
    return comp;
}

console.log(pronObjFrom('/i/l_\'n/E/t/I//N/'));

function wordFrom(word) {
    return word.split('/')[0];
}

function pronObjFrom(pron) {
    pron.split('/');
}

function removeEmpty(array) {
    return array.filter(function(elem) {
        return elem !== '';
    });
}