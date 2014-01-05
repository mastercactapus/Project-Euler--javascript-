var out = require("./timer");
var BigInt = require("./bigint2");

var sum = new BigInt(0, {limit:10});

for (var i=1;i<=1000;i++){
    sum = sum.add(sum.new(i).pow(i));
    console.log(i);
}


out.print(sum.toString());
