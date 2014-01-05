var out = require("./timer");
var optimus = require("./optimus");

var i = 1;
for (;optimus.getPrime(i)<1000;i++){}

function test(n) {
    var s = getSequence(n);
    if (s[0] === 1487) return false; //example
    return optimus.isPrime(s[1]) &&
        optimus.isPrime(s[2]) &&
        arePermutations(s[0],s[1],s[2]);
}

function getSequence(n) {
    var p = optimus.getPrime(n);
    return [p,p+3330,p+6660];
}
function perm(a,b) {
    return a.toString().split("").sort().join("") === b.toString().split("").sort().join("");
}
function arePermutations(a,b,c) {
    return perm(a,b) && perm(b,c);
}

while (!test(i)) {
    i++;
}

out.print(getSequence(i).join(""));
