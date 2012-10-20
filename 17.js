var out = require("./timer");
var numbers = require("./numbers");
var sum=0;
for (var i =1;i<=1000;i++){
	var tmp = numbers.numberName(i).replace(/[ ,-]/g,"");
	sum += numbers.numberName(i).replace(/[ ,-]/g,"").length;
}
out.print(sum);
