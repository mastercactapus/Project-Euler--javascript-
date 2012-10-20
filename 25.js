var out = require("./timer");
var bigint = require("bigint");
var term=3;
var f1=bigint(1);
var f2=bigint(1);
var fn=bigint(2);

var max= bigint(10).pow(999);
while (max.gt(fn)){
	f1=f2;
	f2=fn;
	fn=f1.add(f2);
	term++;
}
out.print(term);
