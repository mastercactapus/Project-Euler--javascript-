var fs = require("fs");

var out = require("./timer");
var numbers = require("./numbers");

var words = fs.readFileSync("words.txt")
    .toString().replace(/"/g,"").split(",");

function wordValue(word) {
    var sum=0;
    word = word.toUpperCase();
    for (var i=0;i<word.length;i++) {
        sum += word.charCodeAt(i)-64;
    }
    return sum;
}

words = words.map(wordValue);

var count = 0;
words.forEach(function(word){
    if (numbers.isTriangle(word)) count++;
});

out.print(count);
