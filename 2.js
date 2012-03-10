var start = new Date().getTime();

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
console.log(sum);

var end = new Date().getTime();
console.log(end-start + " milliseconds.");
