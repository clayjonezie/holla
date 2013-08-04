var rapper = require('./rapper.js');

//rapper.findPron('skyscraper', function(word) {
//    console.log(word);
//});

console.log(new Date());

rapper.findRhymes('brother', function(words) {
    console.log(words);
    console.log(new Date());
});

