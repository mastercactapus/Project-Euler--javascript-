var out = require("./timer");
function firstSix(){
	for (var blk=1;blk<=6;blk++){
var tests = {};
var x=blk;
var y=blk;
for (var i=0;i<1000000;i++){
	var a=x,b=y;
	var tCase="";
	for (var s=0;s<x+y;s++){
		var rnd = (Math.random()>0.5);
		var tmp;
		if (rnd){
			if (a>0) {
				tmp="a";
				a--;
			}
			else tmp="b";
		}
		else {
			if (b>0) {
				tmp="b";
				b--;
			}
			else tmp="a";
		}
		tCase += tmp;
	}
	tests[tCase]=0;
}
var len=0;
for (var i in tests) len++;
console.log(len);
}
}
//firstSix();

var numbers = require("./numbers");
function binom(n){
	return Math.floor(numbers.factorial(2*n) / (Math.pow(numbers.factorial(n),2)));
}

out.print(binom(20));
