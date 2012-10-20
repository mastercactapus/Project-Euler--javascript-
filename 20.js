var out = require("./timer");
var bigint = require("bigint");
var num = bigint(100);
for (var i=99;i>1;i--){
	num=num.mul(i);
}
num=num.toString();
var sum=0;
for (var i in num)
	sum += parseInt(num[i]);

out.print(sum);
