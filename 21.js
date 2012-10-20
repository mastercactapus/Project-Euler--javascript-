var out = require("./timer");
var numbers = require("./numbers");
var sum=0;
for (var i = 2; i < 10000; i++){
	if (numbers.isAmicable(i)) sum +=i;
}
out.print(sum);
