//gets the nth digit of a number, starting at decimal (<=0 for decimal)
exports.getDigit = function(n,digit){
	return (Math.floor(n/(Math.pow(10,digit-1))))%10
}

//tests if a number is a palindrome -- assumes integer
exports.isPalindrome = function(n){
	var str = n.toString();
	var len = Math.floor(str.length/2);
	for (var i=0;i<len;i++){
		if (str[i] != str[str.length-i-1]) return false;
	}
	return true;
}

exports.isPythTriplet = function(a,b,c){
	if (a >= b || b >= c) return false;
	if (Math.pow(a,2) + Math.pow(b,2) == Math.pow(c,2)) return true;
	else return false;
}

exports.countFactors = function(n){
	var factors=0;
	var limit = Math.sqrt(n);
	for (var i=1;i<limit;i++){
		if (n % i == 0) factors+=2;
	}
	if (n/limit == limit) factors++;
	return factors;
}
exports.getFactors = function (n){
	var factors=[];
	var limit = Math.sqrt(n);
	for (var i=1;i<limit;i++){
		if (n % i == 0) {
		factors.push(i);
		factors.push(n/i);
		};
	}
	if (n/limit == limit) factors.push(limit);
	return factors;
}

