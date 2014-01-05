var out = require("./timer");
var optimus = require("./optimus");

var sumCache = {};
function primeSum(s,e) {
    var name = s + "-" + e;

    var nextE = s + "-" + (e - 1);
    var nextS = (s - 1) + "-" + e;
    // if (sumCache[name]) {
    //     return sumCache[name];
    // }
    
    if (sumCache[nextE]) {
        sumCache[name] = sumCache[nextE]+optimus.getPrime(e);
    } else if (sumCache[nextS]){
        sumCache[name] = sumCache[nextS]-optimus.getPrime(s-1);
    } else {
        var sum=0;
        for (var i=s;i<=e;i++) {
            sum += optimus.getPrime(i);
        }
        sumCache[name] = sum;
    }
    
    return sumCache[name];
}

var range = 0;
var num = 0;
//21 from clues in the question
for (var e = 1; optimus.getPrime(e) < 1000000/21; e++) {
    for (var s = e; s>0; s--) {
        var sum = primeSum(s,e);
        if (sum > 1000000) break;
        if (optimus.isPrime(sum) && e-s > range && sum < 1000000) {
            range = e-s;
            num=sum;
        }
    }
}

out.print(num);
