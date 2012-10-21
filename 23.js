var out = require("./timer");
var numbers = require("./numbers");
var abundant=[];
var max = 28123;

/*
 * 
 * quicker way possibly calculate sum of all integers, then subtract
 * the found abundant numbers
 */

for (var i=1;i<=max;i++){ //load all relevant abundant numbers
	abundant[i] = numbers.isAbundant(i);
}

function testSum(n){
	var limit = Math.floor(n/2);
	for (var i in abundant) {
		if (i > limit) return false;
		if (abundant[i] && abundant[n-i]) return true;
	}
	return false;
}
var sum=max * (max + 1) / 2; //sum of all integers

for (var i in abundant){ //load all relevant abundant numbers
	if (testSum(i)) sum -= i;
}
out.print(sum);
