var out = require("./timer");
var optimus = require("./optimus");

var sum=0;
var c=1;

while (optimus.getPrime(c)<2000000){
	sum+= optimus.getPrime(c);
	c++;
}

out.print(sum);
