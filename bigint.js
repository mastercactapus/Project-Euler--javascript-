var BASE = 10; //base used in memory

function add(num1,num2) {
    var res = [];
    var len = Math.max(num1.length,num2.length)+2;
    num1=pad(num1,len);
    num2=pad(num2,len);
    res=pad(res,len);
    var carry=0;
    for (var i = 0;i<len;i++) {
        var val = num1[i] + num2[i] + carry;
        res[i] = (val % BASE);
        carry = val / BASE >> 0;
    }
    return res;
}
function prod(num1,num2) {
    var res=[];
    var len = num1.length + num2.length +2;
    num1=pad(num1,len);
    num2=pad(num2,len);
    res=pad(res,len);
    var carry=0;
    for (var i = 0;i<len;i++){
        for (var j=0;j<len;j++){
            var val = (num2[j] * num1[i]) + carry + res[i+j];
            res[i+j] = (val % BASE);
            carry = val / BASE >> 0;
        }
    }
}
function pad(num,len) {
    if (num.length>=len) return num;
    var padding = num[num.length-1]; //sign bit/chunk
    while (num.length<len) num.push(padding);
    return num;
}
function incr(num) {
    num[0]++;
    if (num[num.length-1] == BASE-1)num.push(0);
    var i=0;
    while (num[i] == BASE) {
        num[i]=0;
        num[i+1]++;
        i++;
    }
}
function compliment(num) {
    var r = BASE-1;
    for (var i=0;i<num.length;i++){
        num[i] = r-num[i];
    }
    return incr(num);
}
function dif(num1,num2) {
    var res = [];
    var len = Math.max(num1.length,num2.length);
    num1.length=len;
    num2.length=len;
    res.length=len;
    return add(num1,compliment(num2)).pop();
}


var bigInt = function(set_data,set_base) {
    var
        base=10,
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
        var tmp =[];
        var len = Math.max(digits.length,num.digits.length)+1;

        for (var i=0;i<len-1;i++) {
            var sum = num.digit(i)/1 + digit(i)/1;
            res.digits[i] = sum % base;
            res.digits[i+1] = Math.floor(sum/base);
        }
        return res;
    }
    function sub(num) {
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

        for (var i=0; i<len; i++){
            res.digits[i] = top(i+1) - bot(i+1);
            console.log()
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
