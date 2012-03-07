var patterns = require("./patterns");

var highest=0;

for (var x=100;x<=999;x++)
	for (var y=x;y<=999;y++){
		var prod = x*y;
		if (Math.max(prod,highest) == prod)  //only test if number is higher
			if (patterns.isPalindrome(prod)) highest = prod;
	}

console.log(highest);
