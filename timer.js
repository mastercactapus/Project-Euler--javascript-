exports.curTime = new Date().getTime();

exports.start = function() {
	exports.curTime = new Date().getTime();
};

exports.print = function(value) {
	var finished = new Date().getTime();

	console.log("Answer:  " + value);
	console.log("Elapsed: " + (finished - exports.curTime) + "ms");
};
