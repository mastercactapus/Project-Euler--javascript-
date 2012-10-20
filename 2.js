var out =require("./timer");

var a = 1;
var b = 2;
var c = 3;
var sum=2;
while (c < 4000000){
c=a+b;
if (c%2 == 0) sum+=c;
a=b;
b=c;
}
out.print(sum);
