function Numbers() {
    this.digitStack = [];
}

var digitStack=[];
Numbers.prototype = {
    factorial: function(n) {
        return n === 1 ? 1 : this.factorial(n-1)*n;
    },
    isTriangle: function(t) {
        if (t<1) return 0;
        var n = (Math.sqrt(1 + 8 * t) - 1) / 2;
        return n % 1 === 0 ? n : 0;
    },
    isPentagonal: function(t) {
        if (t<1) return 0;
        var n = (Math.sqrt(1 + 24 * t) + 1) / 6;
        return n % 1 === 0 ? n : 0;
    },
    isHexagonal: function(t) {
        if (t<1) return 0;
        var n = (Math.sqrt(1 + 8 * t) + 1) / 4;
        return n % 1 === 0 ? n : 0;
    },
    nTriangle: function(n) {
        return n * (3 * n - 1) / 2;
    },
    nPentagonal: function(n) {
        return n * (3 * n - 1) / 2;
    },
    nHexagonal: function(n) {
        return n * (2 * n - 1);
    },
    simplify: function(fraction) {
        var factA = exports.getFactors(fraction[0]);
        var factB = exports.getFactors(fraction[1]);
        factA.push(fraction[0]);
        factB.push(fraction[1]);
        var res=1;
        for (var i in factA) {
            if (factB.indexOf(factA[i])) res=factA[i];
        }
        fraction[0] /= res;
        fraction[1] /= res;
        return fraction;
    },

    countDigits: function(n){
        if (digitStack.length===0)
            for (var i=1;i<=20;i++)digitStack[i-1]=Math.pow(10,i);
        var len=1;
        for (var i=19;i>=0;i--)
            if (n>digitStack[i]) return i+2;
        return 1;
    },

    isPerfect: function(n){
        return (exports.sumOfFactors(n) == n);
    },
    isAbundant: function(n){
        return (exports.sumOfFactors(n) > n);
    },
    isDeficient: function(n){
        return (exports.sumOfFactors(n) < n);
    },
    sumOfFactors: function(n){
        return exports.arraySum(exports.getFactors(n));
    },
    isAmicable: function(n){
        var partner = exports.sumOfFactors(n);
        if (partner == n) return false;
        if (exports.sumOfFactors(partner) == n) return true;
        else return false;
    },

    getDecimal: function(n,d){
        var out = [];
        var carry = [];
        var pattern_start=-1;
        out.push(Math.floor(n/d));
        if (n % d === 0) return out[0];
        carry.push(-1);
        carry.push(n % d*10);
        while (carry[carry.length-1] >0){
            out.push(Math.floor(carry[carry.length-1] / d));
            var c = carry[carry.length-1] % d;
            if (c === 0) break;
            pattern_start = carry.indexOf(c*10);
            if (pattern_start > -1)break;
            carry.push(c*10);
        }
        if (pattern_start > -1)
            return out[0] + '.' + out.slice(1,pattern_start).join("") + "(" + out.slice(pattern_start).join("") + ")";
        else
            return out[0] + "." + out.slice(1).join("");
    },
    firstPermutation: function(str) {
        return str.sort();
    },
    lastPermutation: function(str){
        return str.sort().reverse();
    },
    lexiPermutation: function(str){
        //swap two indexes
        var swap = function(x,y){
            var t = str[x];
            str[x]=str[y];
            str[y]=t;
        };

        var k=-1;
        //this will find the least significant pair of numbers where
        //the least significant digit is greater (213 = 1 and 3)
        for (var i =0;i<str.length-1;i++)
            if (str[i] < str[i+1])k=i;

        if (k==-1) return str; //there are no more permutations

        //this will find the least significant number that is greater
        //than the above number (usually k+1)
        var l=-1;
        for (var i=0;i<str.length;i++)
            if (str[k] < str[i]) l=i;

        //swap the two
        swap(k,l);

        //reverse the sequence for k+1 to the end of the array
        // as k+1 is the most significant change, the others are
        //already in greatest to least order.

        return str.slice(0, k + 1).concat(str.slice(k + 1).reverse());
    },

    //gets the nth digit of a number, starting at decimal (<=0 for decimal)
    getDigit: function(n,digit){
        return (Math.floor(n/(Math.pow(10,digit-1))))%10
    },

    arraySum: function(nArray){
        var sum=0;
        for (var i in nArray)
            sum += nArray[i];
        return sum;
    },

//tests if a number is a palindrome -- assumes integer
    isPalindrome: function(n){
        var str = n.toString();
        return str ==  str.split("").reverse().join("");
    },

    isPythTriplet: function(a,b,c){
        if (a >= b || b >= c) return false;
        if (Math.pow(a,2) + Math.pow(b,2) == Math.pow(c,2)) return true;
        else return false;
    },
    isPandigital: function(n){
        if (n<1 || n>987654321)return false;
        var num = n.toString();
        for (var i=1,len=num.length;i<=len;i++) {
            if (num.indexOf(i.toString()) === -1) return false;
        }

        return true;
    },

    countFactors: function(n){
        var factors=0;
        var limit = Math.sqrt(n);
        for (var i=1;i<limit;i++){
            if (n % i == 0) factors+=2;
        }
        if (n/limit == limit) factors++;
        return factors;
    },

    getFactors: function (n){
        if (n <= 3){
            switch(n){
                case 0:
                return [0];
                default:
                return [1];
            }
        }
        var factors=[1];
        var limit = Math.floor(Math.sqrt(n));
        for (var i=2;i<limit;i++){
            if (n % i === 0) {
            factors.push(i);
            factors.push(n/i);
            }
        }
        if (n/limit == limit) factors.push(limit);
        else if (n % limit === 0){
            factors.push(limit);
            factors.push(n/limit);
        }
        return factors;
    },


    stringSum: function(num1,num2){
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
        while (sum[sum.length-1] === 0)sum.pop();
        return sum.reverse().join("");
    },

    getDigit: function(n,digit){
    n=parseInt(n);
        return (Math.floor(n/(Math.pow(10,digit-1))))%10;
    },
    getDigitS: function(n,digit){ //todo
        n=n.toString();
    },
    getDigitArray: function(n){
        return Math.abs(Math.floor(n)).toString().split("");
    },
    tripletName: function (n){
        var words = "Zero One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety Hundred".split(" ");
        n = parseInt(n);
        var h=exports.getDigit(n,3),
            t=exports.getDigit(n,2),
            o=exports.getDigit(n,1);
        if (t+h+o === 0) return words[0];
        var out="";
        if (h>0) {out += words[h] + " hundred" + ((t+o > 0) ? ' and':'');}

        if (t>1) {out += " " + words[t + 18] + ((o>0) ? '-' + words[o] : '');}
        else if (t == 1) {out += " " + words[o+10];}
        else if (o>0){out += " " + words[o];}
        return out.trim();
    },

    numberName: function (n){
        var suffix = "Thousand Million Billion Trillion Quadrillion Quintillion Sextillion Septillion Octillion Nonillion Decillion Undecillion Duodecillion Tredecillion Quattuordecillion Quindecillion Sexdecillion Septendecillion Octodecillion Novemdecillion Vigintillion Unvigintillion Duovigintillion Trevigintillion Quattuorvigintillion Quinvigintillion Sexvigintillion Septenvigintillion Octovigintillion Novemvigintillion Trigintillion Untrigintillion Duotrigintillion".split(" ");
        var name = "";
        n=n.toString();
        if (n == "0") return "Zero";
        var negative = (n[0] == '-');
        var decI = n.indexOf(".");
        var decimal = decI > -1 ? n.substr(decI) : '';
        var number = n.substring(n.indexOf('-')+1,(decI > -1 ? decI - 1 : n.length));

        var triplets = Math.ceil(number.length / 3);

        var offset = 3-number.length % 3; //final triplet offset
        if (offset == 3) offset=0;
        var out = [];
        for (var i = 0; i < triplets; i++){
            var cTrip;
            if (i === 0 && offset > 0){
                cTrip = number.substr(0,3-offset);
            } else {
                cTrip = number.substr(3*i - offset,3);
            }
            cTrip = parseInt(cTrip);
            if (cTrip > 0){
                var tmp = exports.tripletName(cTrip);
                if (triplets-i-2 >= 0) tmp += " " + suffix[triplets-i-2];
                out.push(tmp);
            }
        }
        return out.join(", ").trim().toLowerCase();
    },

    factorial: function(n){
        var prod=1;
        for (var i=n;i>1;i--){
            prod *= i;
        }
        return prod;
    }
};

module.exports = new Numbers();
module.exports.Numbers = Numbers;
