var num=1;
var chain=1;

for (var i=2;i<1000000;i++){
	var tmp = i;
	var count = 0;
	while (tmp != 1){
		if (tmp %2 == 0) tmp = tmp/2;
		else tmp = tmp*3 + 1;
		count++;
	}
	if (count > chain){
		chain = count;
		num=i;
	}
}

console.log(num);
