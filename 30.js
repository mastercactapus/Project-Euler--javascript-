var numbers = require("./numbers");
var sum=0;
var sumPower = function(n,p){
var digits=n.toString().split("");
var tSum = 0;
for (var i in digits){
tSum += Math.pow(parseInt(digits[i]),p);
}
return (tSum == n);
}

var max_digit = Math.pow(9,5);
var t=2;
while (t < max_digit * numbers.countDigits(t)){
if (sumPower(t,5))
sum+=t;
t++;
}

console.log(sum);
