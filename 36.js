var out=require("./timer");
var numbers=require("./numbers");

var sum=0;

for (var i=1;i<1000000;i++){
    if (numbers.isPalindrome(i.toString(10)) && numbers.isPalindrome(i.toString(2)))
        sum+=i;
}
out.print(sum);
