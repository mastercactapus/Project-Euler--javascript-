var out = require("./timer");
var numbers = require("./numbers");
var optimus = require("./optimus");

var prime = 1;
var pNum = optimus.getPrime(prime);

var largest=0;

while (pNum <= 999999) {
   // if (numbers.isPandigital(pNum) && pNum > largest) largest=pNum;
    prime++;
    pNum=optimus.getPrime(prime);
}

out.print(largest);
