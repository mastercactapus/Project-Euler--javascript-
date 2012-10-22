var out= require("./timer");
var numbers = require("./numbers");

var num = 3;
var sum=0;

var max = numbers.factorial(9);


while (num<max) {
    var digits = numbers.getDigitArray(num);
    var rSum = 0;
    for (var i=0;i<digits.length && rSum<num;i++){
        rSum += numbers.factorial(digits[i]);
    }
    if (rSum == num) {
        sum+=num;
    }

    num++;
}

out.print(sum);
