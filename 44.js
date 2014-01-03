var out = require("./timer");
var numbers = require("./numbers");

var pentagonal = [1];
function test(a,b) {
    return numbers.isPentagonal(a) &&
        numbers.isPentagonal(b) &&
        numbers.isPentagonal(Math.abs(a-b)) &&
        numbers.isPentagonal(a+b);
}

function any(n) {
    for (var i=0;i<pentagonal.length;i++){
        if (test(pentagonal[i],n)) return [n,pentagonal[i]];
    }
    return null;
}

var solution = null;

while (solution === null) {
    var next = numbers.nPentagonal(pentagonal.length);
    solution = any(next);
    pentagonal.push(next);
}


out.print(Math.abs(solution[0] - solution[1]));
