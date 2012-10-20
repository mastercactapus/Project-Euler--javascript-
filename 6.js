var out = require("./timer");
var sum_of_squares = 0;
var square_of_sum = 0;

for (var i=1;i<=100;i++){
	square_of_sum += i;
	sum_of_squares += Math.pow(i,2);
}
square_of_sum = Math.pow(square_of_sum,2);

out.print(square_of_sum - sum_of_squares);
