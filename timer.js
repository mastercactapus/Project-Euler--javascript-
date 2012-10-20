var curTime;

exports.start = function() {
	curTime = new Date().getTime();
};

exports.print = function(value) {
	var finished = new Date().getTime();

	console.log("Answer: " + value);
	console.log(finished- curTime + "ms");
};
