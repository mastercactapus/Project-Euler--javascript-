var out = require("./timer");
var optimus= require("./optimus");
var max=0;
var max_prod=0;
var calc = function(a,b,n){
	return Math.pow(n,2) + a*n + b;
}

for (var a=-999;a<1000;a++){
	for (var b=-999;b<1000;b++){
		var i=0;
		while (optimus.isPrime(calc(a,b,i))) i++;
		if (i>max) {
			max=i;
			max_prod=a*b;
		}
	}
}

out.print(max_prod);
