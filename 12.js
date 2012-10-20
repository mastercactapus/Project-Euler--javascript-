var out = require("./timer");
var numbers = require("./numbers")
var tri = 1;
var inc = 1;
var div = 1;

while (div <= 500){
	inc++;
	tri += inc;
	div = numbers.countFactors(tri);
}
out.print(tri);
