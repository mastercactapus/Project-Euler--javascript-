var out=require("./timer");
var optimus = require("./optimus");

var count=11; //told by Euler there are 11
var sum=0;

function testPrime(test_num){
    var num = test_num.toString();
    if (!optimus.isPrime(num/1)) return false;
    for (var i=1;i<num.length;i++){
        if (!optimus.isPrime(num.substr(0,num.length-i)/1)) return false;
        if (!optimus.isPrime(num.substr(i)/1)) return false;
    }
    return true;
}

var prime=5; //skip 2,3,5, and 7
for (var found=0;found<count;prime++){
    var x = optimus.getPrime(prime);
    if (testPrime(x)) {
        sum+= x;
        found++;
    }
}

out.print(sum);
