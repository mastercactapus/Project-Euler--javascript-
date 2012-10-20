var out = require("./timer");
var t=20;

function testCase(n){
	for (var i=1;i<=20;i++){
		if (n%i!==0) return false;
	}
	return true;
}

while (!testCase(t)) t++;

out.print(t);
