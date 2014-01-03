var out = require("./timer");
var optimus = require("./optimus");

var n = 9; //first odd composite number

function lowerPrimes(n) {
    var i=1;
    var primes = [];
    var prime;
    while ((prime = optimus.getPrime(i)) < n) {
        primes.push(prime);
        i++;
    }
    return primes;
}
function range(n) {
    var nums = [];
    for (var i=0;i<=n;i++) {
        nums.push(i);
    }
    return nums;
}
function test(n) { //assuming all are odd
    if (optimus.isPrime(n)) return false;

    var primes = lowerPrimes(n);
    var squares = range(Math.sqrt(n/2));

    for (var p=0;p<primes.length;p++){
        for (var s=0;s<squares.length;s++){
            if ((primes[p] + (2 * Math.pow(squares[s],2))) == n) {
                return false;
            }
        }
    }

    return true;
}

while (!test(n)){
    n+=2;
}

out.print(n);
