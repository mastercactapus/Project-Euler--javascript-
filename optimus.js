var util = require("./util");
exports.primes =[2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
179, 181, 191, 193, 197, 199, 211, 223, 227, 229];

//gets the nth prime number, finding new ones as nessisary
exports.getPrime = function(n){
        while (exports.primes.length < n) newPrime();
        return exports.primes[n-1];
};

//gets the next prime number (that hasn't been found)
var newPrime = function(){
        var cTest = exports.primes[exports.primes.length-1] + 2;
        while (!exports.isPrime(cTest)) cTest +=2;
        exports.primes.push(cTest);
        return cTest;
};

//given n, return the next number that is prime
exports.nextPrime = function(n) {
    if (exports.primes[exports.primes.length-1] < n) {
        while (exports.primes[exports.primes.length-1] < n) newPrime();
        return exports.primes[exports.primes.length-1];
    }
    return util.scanArray(exports.primes, function(i) {
        if (n == exports.primes[i] || (exports.primes[i]>n && exports.primes[i-1]<n)) return 0;
        if (exports.primes[i] > n) return -1;
        if (exports.primes[i] < n) return 1;
    });
}

exports.lowestFactor = function(n){
   var prime = 1;
   while (n % exports.getPrime(prime) !== 0) prime++;
   return exports.getPrime(prime);
};
exports.primeFactors = function(n){
   var factors = [];
   var limit = n/2;
   var prime = 1;
   while (exports.getPrime(prime) < limit) {
        if (n % exports.getPrime(prime) === 0) factors.push(exports.getPrime(prime));
        prime++;
   }
   return factors;
};

//tests if a number is prime
exports.isPrime = function(n){
        if (n < exports.primes[exports.primes.length-1])
                return (exports.primes.indexOf(n) > -1);
        var limit_f = Math.sqrt(n);
    var limit = Math.floor(limit_f);
        if (limit_f == Math.floor(limit)) return false;
        var cTest = 1;
        while (exports.getPrime(cTest) <= limit){
                if (n % exports.getPrime(cTest) === 0) return false;
                cTest++;
        }
        return true;
};
