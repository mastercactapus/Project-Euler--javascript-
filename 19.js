var current = new Date("1 Jan 1901");
var end = new Date("31 Dec 2000");
var sundays = 0;
while (current <= end){
	if (current.getDay() == 0 && current.getDate() == 1) sundays++;
	current.setDate(current.getDate()+1);
}
console.log(sundays);
