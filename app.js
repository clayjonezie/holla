var rapper = require('./rapper.js');

rapper.findPron('skyscraper', function(word) {
    console.log(word);
});

rapper.findRhymes('season', function(words) {
    console.log(words);
});