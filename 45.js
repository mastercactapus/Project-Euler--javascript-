var out = require("./timer");
var numbers = require("./numbers");

var i=numbers.isTriangle(40755) + 1;

function test(n) {
    return numbers.isTriangle(n) &&
        numbers.isPentagonal(n) &&
        numbers.isHexagonal(n);
}

while (!test(numbers.nTriangle(i))){
    i++;
}

out.print(numbers.nTriangle(i));

