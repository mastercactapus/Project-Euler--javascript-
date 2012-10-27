exports.scanArray = function(array,test) {
    var upper= array.length-1;
    var lower = 0;
    var i = Math.floor(array.length/2);
    var res = test(i);
    while (res !== 0) {
        if (res > 0)
            lower = i+1;
        else if (res < 0)
            upper = i-1;
        i = Math.floor((lower+upper)/2);
        res = test(i);
    }
    return i;
}
