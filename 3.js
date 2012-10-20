var optimus = require("./optimus");
var out = require("./timer");

var num=600851475143;

var limit = Math.floor(Math.sqrt(num));
var hFactor=0;


var i=1;

while (optimus.getPrime(i) <= limit) {
	if (num % optimus.getPrime(i) == 0) {
		hFactor = optimus.getPrime(i);
	}
	i++;
}

out.print(hFactor);
