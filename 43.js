var out = require("./timer");
var numbers = require("./numbers");

var digits = "0123456789".split("");
var perms = numbers.factorial(10);


var sum = 0;
function testAdd(n) {
    if (
        +n.slice(1,4).join("") % 2 === 0 &&
        +n.slice(2,5).join("") % 3 === 0 &&
        +n.slice(3,6).join("") % 5 === 0 &&
        +n.slice(4,7).join("") % 7 === 0 &&
        +n.slice(5,8).join("") % 11 === 0 &&
        +n.slice(6,9).join("") % 13 === 0 &&
        +n.slice(7,10).join("") % 17 === 0) {

        sum += +n.join("");
    }
}

for (var i=0;i<perms;i++) {
    testAdd(digits);
    digits = numbers.lexiPermutation(digits);
}

out.print(sum);
