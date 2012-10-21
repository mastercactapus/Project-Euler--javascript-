exports.max = function(num1,num2) {
    return (num1.gt(num2)) ? num1 : num2;
}
exports.min = function(num1,num2) {
    return (num1.lt(num2)) ? num1 : num2;
}

var bigInt = function(number,isPositive) {
    var
        base = 10,
        digits=[],
        positive=true,
        self=this;
    function pad(minSize){ //pass a list of bigInts, set them all to the same padding
        while (digits.length < minSize) digits.push(0);
    }
    function digit(num){
        if (num>= digits.length) return 0;
        return digits[num];
    }
    function eq(num) {
        var i = Math.max(num.digits.length,digits.length);
        for (i--;i>=0;i--){
            if (digit(i)!=num.digit(i)) return false;
        }
        return false;
    }
    function gt(num){
        var i = Math.max(num.digits.length,digits.length);
        for (i--;i>=0;i--){
            if (digit(i)>num.digit(i)) return true;
            else if (digit(i)<num.digit(i)) return true;
        }
        return false;
    }
    function lt(num){
        var i = Math.max(num.digits.length,digits.length);
        for (i--;i>=0;i--){
            if (digit(i)<num.digit(i)) return true;
            else if (digit(i)>num.digit(i)) return true;
        }
        return false;
    }

    function lte(num){
        return lt(num) || eq(num);
    }
    function gte(num){
        return gt(num) || eq(num);
    }
    function abs() {
        return new bigInt(digits, positive);
    }
    function add(num){
        var res= new bigInt(0);
        var len = Math.max(digits.length,num.digits.length)+1;

        for (var i=0;i<len-1;i++) {
            var sum = num.digit(i)/1 + digit(i)/1;
            res.digits[i] = sum % base;
            res.digits[i+1] = Math.floor(sum/base);
        }
        return res;
    }
    function sub(num) {
        console.log(toString());
        console.log(num.toString());
        var res = new bigInt(0);
        if (eq(num)) return res;
        var len = Math.max(digits.length,num.digits.length);

        var top,bot;
        if (gt(num)) {
            top = digit;
            bot = num.digit;
        } else {
            res = res.invert();
            top=num.digit;
            bot=digit;
        }

        for (var i in res.digits){
            res.digits[i] = top(i) - bot(i);
            if (res.digits[i]<0) {
                res.digits[i]+=10;
                res.digits[i+1]--;
            }
        }
        return res;
    }
    function invert() {
        return new bigInt(digits,!positive);
    }

    function trim() {
        var tmp = digits.length;
        for (var i=digits.length-1;i>0;i--){
            if (digits[i]!==0) break;
        }
        digits.length=i+1;
    }

    function init() {
        if (typeof number.digits != "undefined") {
            digits = number.digits;
            positive = typeof isPositive != "undefined" ? isPositive : number.positive;
        }
        else if (typeof number.length != "undefined") {
            digits = number;
            positive = typeof isPositive != "undefined" ? isPositive : number.positive;
        }
        else if (typeof number == 'number') {
            var str = number.toString();
            var decimal = str.indexOf(".");
            if (decimal>-1) str = str.substr(0,decimal);
            if (str[0]=="-") {
                positive=false;
                str=str.substr(1);
            } else positive=true;
            digits = str.split("").reverse();
        }
    }

    function toString(){
        trim();
        return (positive ? "" : "-") + digits.reverse().join("");
    }

    function addVal(num) {
        num = new bigInt(num);
        if (num.positive != positive) {
            return positive ? sub(num) : sub(num).invert();
        } else
            return positive ? add(num) : add(num).invert();
    }
    function subVal(num) {
        num = new bigInt(num);
        return addVal(num.invert());
    }
    function isGreater(num) {
        num = new bigInt(num);
        if (num.positive != positive)
            return positive;
        else return gt(num);
    }
    function isLess(num){
        num = new bigInt(num);
        if (num.positive != positive)
            return !positive;
        else return lt(num);
    }
    function isEqual(num){
        num = new bigInt(num);

    }

    init();
    return {
      toString:toString,
      add:addVal,
      sub:subVal,
      gt:isGreater,
      lt:isLess,
      eq:isEqual,
      invert:invert,
      digits:digits,
      positive:positive,
      digit:digit
    };
}

var a = new bigInt(4);
var b = new bigInt(50);
console.log(a.sub(b).toString());
