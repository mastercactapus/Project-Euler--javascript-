var out = require("./timer");
var numbers = require("./numbers");

dance:
for (var a=0;a<999;a++){
	for (var b=a+1;b<999;b++){
		for (var c=b+1;c<999;c++){
			if (a+b+c == 1000){
				if (numbers.isPythTriplet(a,b,c)){
					out.print(a*b*c);
					break dance;
				}
			}
		}
	}
}

