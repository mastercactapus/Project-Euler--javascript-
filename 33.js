var out=require("./timer");
var numbers=require("./numbers");

//lets brute force this thing
/*
	so we need to find the 4 fractions that follow this principal
            ax     a
           ---- = ---
            xb     b
 */

var total=[1,1];
for (var b=1;b<10;b++){
	for (var a=1;a<b;a++){
		for (var x=1;x<10;x++){

			var numerator = parseInt(a.toString() + x.toString());
			var denominator = parseInt(x.toString() + b.toString());

			if (numerator/denominator == a/b) {
				total[0] *= a;
				total[1] *= b;
			}
		}
	}
}

out.print(numbers.simplify(total)[1]);

