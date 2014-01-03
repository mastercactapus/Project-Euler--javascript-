var out = require("./timer");
var numbers = require("./numbers");
var optimus = require("./optimus");

var prime = 1;
var pNum = optimus.getPrime(prime);


function testPermutation(digits) {
    var num = +digits.join("");
    return optimus.isPrime(num) ? num : null;
}
function getLargest(digits) {
    var permutation = numbers.firstPermutation(digits.split(""));
    var max = numbers.factorial(digits.length);
    var largest = null;

    for (var i=0;i<max;i++){
        largest = testPermutation(permutation) || largest;
        permutation = numbers.lexiPermutation(permutation);
    }
    return largest;
}

var digits = "123456789";
var winner = null;
while (!winner) {
    winner = getLargest(digits);
    digits = digits.substr(0,digits.length-1);
}
out.print(winner);
