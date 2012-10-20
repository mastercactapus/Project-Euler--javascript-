exports.primes =[2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
179, 181, 191, 193, 197, 199, 211, 223, 227, 229];

//gets the nth prime number, finding new ones as nessisary
exports.getPrime = function(n){
	while (exports.primes.length < n) nextPrime();
	return exports.primes[n-1];
};

//gets the next prime number (that hasn't been found)
var nextPrime = function(){
	var cTest = exports.primes[exports.primes.length-1] + 2;
	while (!exports.isPrime(cTest)) cTest +=2;
	exports.primes.push(cTest);
	return cTest;
};

//tests if a number is prime
exports.isPrime = function(n){
	if (n < exports.primes[exports.primes.length-1])
		return (exports.primes.indexOf(n) > -1);
	var limit = Math.sqrt(n);
	if (limit == Math.floor(limit)) return false;
	var cTest = 1;
	while (exports.getPrime(cTest) <= limit){
		if (n % exports.getPrime(cTest) === 0) return false;
		cTest++;
	}
	return true;
};
