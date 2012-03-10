
var n = require("./numbers");
var tmp = "0123456789".split(""); //this is first permutation
for (var i=1;i<1000000;i++){ //calculate 999999 more
	tmp=n.lexiPermutation(tmp);
}
console.log(tmp.join(""));
