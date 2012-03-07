exports.stringSum = function(num1,num2){
	num1 = num1.split("").reverse();
	num2 = num2.split("").reverse();
	var sum=[];
	var carry=0;
	var len = Math.max(num1.length,num2.length) +1;
	for (var i=0;i<len;i++){
		var tmp = carry;
		if (num1.length > i) tmp+=parseInt(num1[i]);
		if (num2.length > i) tmp+=parseInt(num2[i]);
		sum.push(tmp % 10);
		carry = Math.floor(tmp/10);
	}
	while (sum[sum.length-1] == 0)sum.pop();
	return sum.reverse().join("");
}

exports.getDigit = function(n,digit){
	return (Math.floor(n/(Math.pow(10,digit-1))))%10
}

exports.toWords= function (n){
	var words = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty fourty fifty sixty seventy eighty ninety hundred thousand million billion trillion".split();
	var data = n.toString();
	var groups = Math.ceil(data.length/3);
	var offset = data.length % 3;
	var name = "";
	if (n == 0) return "zero";
	for (var i=groups;i>0;i--){
		var tmp = " ";
		var triplet = parseInt(data.substr((i-groups) * 3 - offset,(i==groups)?3-offset:3));
		if (triplet > 0){
		var hundreds = exports.getDigit(triplet,3);
		var tens = exports.getDigit(triplet,2);
		var ones = exports.getDigit(triplet,1);
		var tenone = tens*10 + ones
		
		if (hundreds != 0) tmp += words[hundreds] + " hundred" + (tenone > 0) ? " and " : "";
		if (tenone > 0){
			if (tenone < 20) tmp += words[tenone];
			else if (ones == 0) tmp +=  words[18+tens];
			else tmp +=  words[18+tens] + "-" + words[ones];
		}
		if (i>1) tmp +=" " + words[27+i];
		name += tmp;
	}
	}
	return name;

}

exports.factorial = function(n){
	var prod=1;
	for (var i=n;i>1;i--){
		prod *= i;
	}
	return prod;
}
