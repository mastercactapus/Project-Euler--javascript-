var out = require("./timer");

var coins = [1,2,5,10,20,50,100,200];

var total = 200;

var max_coins=200;

function sumCoins(set) {
	var s=0;
	for (var i in coins){
		s+= coins[i] * set[i];
	}
	return s;
}
function countCoins(set) {
	var s=0;
	for (var i in set) {
		s += set[i];
	}
	return s;
}
function incrTrial(set) {
	var i=0;
	set[i]++;
	while (countCoins(set) > max_coins || sumCoins(set)>total) {
		if (i==7) return set;
		set[i]=0;
		set[i+1]++;
		i++;
	}
	return set;
}
var trial=[0,0,0,0,0,0,0,0];

var permutations = 0;

while (trial[7]<=1){
	trail = incrTrial(trial);
	if (sumCoins(trial)==total)permutations++;
}
out.print(permutations);
