var out = require("./timer");
var numbers = require("./numbers");
var max=0;
var size=0;
for (var i=1;i<1000;i++){
	var tmp=numbers.getDecimal(1,i);
	if (tmp.length > size){
		size = tmp.length;
		max=i;
	}
}
out.print(max);
