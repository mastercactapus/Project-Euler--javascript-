var patterns = require("./patterns")
var tri = 1;
var inc = 1;
var div = 1;

while (div <= 500){
	inc++;
	tri += inc;
	div = patterns.countFactors(tri);
}
console.log(tri);
