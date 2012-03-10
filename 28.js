var sum=1;

var layer=0;
var num=1;

for (var i=1;i<=500;i++){

	num+=i*2;
	
	sum+=num;
	num+=i*2;
	
	sum+=num;
	num+=i*2;
	
	sum+=num;
	num+=i*2;
		sum+=num;

}
console.log(sum);
