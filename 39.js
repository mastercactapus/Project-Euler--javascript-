var out=require("./timer");
var numbers=require("./numbers");

var sums = {};

for (var c=3;c<1000;c++){
    for (var b=2;b<c;b++) {
        for (var a=1;a<b;a++){
            if (numbers.isPythTriplet(a,b,c)) {
                var sum = a+b+c;
                if (sum<=1000) {
                    if (typeof sums[sum] == "undefined") sums[sum]=1;
                    else sums[sum]++;
                }
            }
        }
    }
}

var best=0;
var best_count=0;
for (var i in sums) {
    if (sums[i] > best_count) {
        best_count=sums[i];
        best=i;
    }
}
out.print(best);
