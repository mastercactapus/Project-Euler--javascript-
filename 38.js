var out=require("./timer");
var numbers=require("./numbers");


function multCat(num,n) {
    var str="";
    for (var i=1;i<=n;i++){
        str += (num*i).toString();
    }
    return str;
}
function test(num){
    var n=2;
    var tstr = multCat(num,n);
    while (tstr.length<=9){
        if (numbers.isPandigital(tstr)) return tstr;
        n++;
        tstr = multCat(num,n);
    }
    return null;
}

var largest=0;
var limit=9999; //number cant be more than 4 chars long, since n >1 

for (var i=1;i<=limit;i++){
    var val;
    if ((val=test(i)) != null) {
        largest = Math.max(val,largest);
    }
}
out.print(largest);
