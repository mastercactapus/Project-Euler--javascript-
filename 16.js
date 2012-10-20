var out = require("./timer");
var bigint = require("bigint");
var num = bigint.pow(2,1000).toString().split("");
var sum=0;
for (var i in num){
	sum += parseInt(num[i]);
}
out.print(sum);
