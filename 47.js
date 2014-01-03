var out = require("./timer");
var optimus = require("./optimus");

function testFactors(n) {
    return optimus.primeFactors(n).length === 4;
}

function test(n) {
    return testFactors(n) &&
        testFactors(n+1) &&
        testFactors(n+2) &&
        testFactors(n+3);
}

var i = 1;

while (!test(i)) {
    i++;
}

out.print(i);
