var out = require("./timer");
var optimus = require("./optimus");
var numbers = require("./numbers");

function permutable_prime(test_num) {
    var num = test_num.toString().split("");

    var check,perm = numbers.firstPermutation(num);
    console.log(perm.join(""));
    if (!optimus.isPrime(perm.join("")/1)) return false;
    while ((check=numbers.lexiPermutation(perm)) != perm) {
        if (!optimus.isPrime(check.join("")/1)) {return false;}
        perm=check;
    }
    return true;
}
function circular_prime(test_num) {
    var num = test_num.toString().split("");
    if (!optimus.isPrime(num.join("")/1)) return false;
    for (var i in num) {
        num.unshift(num.pop());
        if (!optimus.isPrime(num.join("")/1)) return false;
    }
    return true;
}

var prime=1;
var count = 0;
var max = 1000000;

while (optimus.getPrime(prime)<max) {
    if (circular_prime(optimus.getPrime(prime))){
        count++;
    }
    prime++;
}
out.print(count);
