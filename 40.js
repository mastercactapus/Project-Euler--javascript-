var out=require("./timer");

var str=""
var n=1;

var limit=1000000;

while (str.length<limit) {
    str+=n;
    n++;
}

var prod=1;
for (var i=1;i<=limit;i*=10) {
    prod *= str[i-1]/1;
}

out.print(prod);
