var out = require("./timer");
var numbers = require("./numbers");
var abundant=[];

/*
 * 
 * quicker way possibly calculate sum of all integers, then subtract
 * the found abundant numbers
 */

for (var i=1;i<=28123;i++){ //load all relevant abundant numbers
	if (numbers.isAbundant(i)) abundant.push(i);
}
function testSum(n){
	var limit = Math.floor(n/2);
	for (var i=0;i<abundant.length;i++){
		if (abundant[i]>limit)return false;
		if (abundant.indexOf(n-abundant[i]) >-1) return true;
	}
	return false;
}
var sum=0;
for (var i=1;i<=28123;i++){ //load all relevant abundant numbers
	if (!testSum(i)) sum+=i;
}
out.print(sum);
