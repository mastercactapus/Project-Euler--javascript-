
// var base = 10;

function BigInt(n,options) {
    if (n instanceof BigInt) {
        this._d = n._d.slice(0);
        this.limit = n.limit;
        this.negative = n.negative;
        this.base = options.base || n.base;
        
        if (this.base !== n.base) {
            this._d = this._baseConvert(this._d, n.base, this.base);
        }
        
        return this;
    }
    options = options || {};
    this.limit = options.limit||Infinity;
    this._d = [0];
    this.base = options.base||10;
    
    if (typeof n === "number") {
        this._fromNumber(n);
    } else if (typeof n === "string") {
        this._fromString(n);
    } else if (n instanceof Array) {
        this._d = n.slice(0);
    } else {
        throw new TypeError("Invalid type, only BigInt, number, and string are supported.");
    }
}
BigInt.max = function(a,b) {
    a = new BigInt(a);
    b = new BigInt(b);
    return a.gt(b) ? a : b;
};
BigInt.min = function(a,b) {
    a = new BigInt(a);
    b = new BigInt(b);
    return a.lt(b) ? a : b;
};

BigInt.prototype = {
    toString: function(){
        return (this.negative && !this.zero() ? "-" : "") +
            this._baseConvert(this._d.slice(0,this.len), this.base, 10).reverse().join("");
    },
    toInteger: function() {
        var out = 0;
        var len =this.len;
        for (var i=0;i<len;i++){
            out += Math.pow(this.base, i) * this._get(i);
        }
        
        return this.negative ? -out : out;
    },
    mul: function(n) {
        n = this.new(n);
        var out = this.new(0);
        out.negative = this.negative !== n.negative;
        var nlen = n.len;
        var tlen = this.len;
        var d = [];
        var i=nlen+tlen-2;
        while (i>=0) {
            d[i]=0;
            i--;
        }
        
        for (var _n=0;_n<nlen;_n++) {
            for (var _t=0;_t<tlen;_t++) {
                d[_n+_t] += n._get(_n) * this._get(_t);
            }
        }
        
        out._apply(d);
        return out;
    },
    pow: function(n) {
        n = this.new(n);
        var out = this.new(1);
        var zero = this.new(0);
        
        for (;!n.zero();n.dec()){
            out = out.mul(this);
        }
        return out;
    },
    add: function(n) {
        n = this.new(n);
        return n.negative === this.negative ? this._add(n) : this._sub(n);
    },
    sub: function(n) {
        n = this.new(n);
        return n.negative === this.negative ? this._sub(n) : this._add(n);
    },
    zero: function() {
        return this._d[0] === 0 && this.len === 1;
    },
    
    div: function(n) {
        n = this.new(n);
        
        var res = this._div(n);
        res[0].negative = this.negative !== n.negative;
        
        return res[0];
    },
    mod: function(n) {
        n = this.new(n);
        
        var res = this._div(n);
        res[1].negative = this.negative !== n.negative;
        
        return res[1];
    },
    
    _div: function(n) {
        n = this.new(n);
        var rem = this.new(this);
        var val = this.new(0);
        while (rem._gte(n)) {
            rem = rem._sub(n);
            val.inc();
        }
        return [val,rem];
    },
    
    _add: function(n) {
        var len = Math.max(this.len, n.len);
        var out = this.new(0);
        out.negative = this.negative;
        var d = [];
        for (var i=0;i<=len;i++){
            d[i] = this._get(i) + n._get(i)
        }
        out._apply(d);
        return out;
    },
    _sub: function(n) {
        var len = Math.max(n.len, this.len);
        var i;
        var d = [];

        var out = this.new(0);
        out.negative = this.negative;
        if (this._lt(n)) {
            out.negative = !this.negative;
            for (i=0;i<len;i++){
                d[i] = n._get(i) - this._get(i);
            }
        } else if (this._gt(n)) {
            for (i=0;i<len;i++){
                d[i] = this._get(i) - n._get(i);
            }
        }
        
        out._apply(d);
        return out;
    },

    _cmp: function(n,cmp) {
       n = this.new(n);
       
        var len = Math.max(n._d.length, this._d.length);
        if (this._get(len) === n._get(len)) {
            for (var i = len;i>0;i--) {
                if (this._get(i) !== n._get(i)) return cmp(this._get(i), n._get(i));
            }
            return cmp(this._get(0), n._get(0));
        } else {
            return cmp(n._get(len), this._get(len));
        }
    },
    _lt: function(n) {
        return this._cmp(n, function(a,b) {
            return a<b;
        });
    },
    lt: function(n) {
        n = this.new(n);
        if (n.negative === this.negative) return this._lt(n);
        else return this.negative;
    },
    _gt: function(n) {
        return this._cmp(n, function(a,b){
            return a>b;
        });
    },
    gt: function(n) {
        n = this.new(n);
        if (n.negative === this.negative) return this._gt(n);
        else return !this.negative;
    },
    _lte: function(n) {
        return this._cmp(n, function(a,b){
            return a<=b;
        });
    },
    lte: function(n) {
        n = this.new(n);
        if (n.negative === this.negative) return this._lte(n);
        else return this.negative;
    },
    _gte: function(n) {
        return this._cmp(n, function(a,b){
            return a>=b;
        });
    },
    gte: function(n) {
        n = this.new(n);
        if (n.negative === this.negative) return this._gte(n);
        else return !this.negative;
    },

    _eq: function(n) {
        return this._cmp(n, function(a,b){
            return a===b;
        });
    },
    eq: function(n) {
        n = this.new(n);
        if (n.neg === this.neg) return this._eq(n);
        else return false;
    },
    inc: function() {
        this._apply([1]);
    },
    dec: function() {
        this._apply([-1]);
    },

    new: function(n) {
        return new BigInt(n, this);
    },
    get len() {
        for (var i=this._d.length-1;i>=0;i--){
            if (this._d[i] > 0) return i+1;
        }
        return 1;
    },
    get neg() {
        return this.negative;
    },
    set neg(val) {
        this.negative = val;
    },
    _baseConvert: function(array, fromRadix, toRadix) {
        if (fromRadix === toRadix) return array;
        var from = new BigInt(array, {base: fromRadix});
        
        var out = new BigInt(0,{base: toRadix});
        
        var res = from._div(toRadix);
        var d = [];

        for (var i=0;!res[0].zero();i++,res=res[0]._div(toRadix)) {
            d[i] = res[1].toInteger();
        }
        
        d[i] = res[1].toInteger();
        
        out._apply(d);
            
        return out._d;
    },
    
    _fromString: function(str) {
        this.negative = str[0] === "-" ? (str = substr(1), true) : false;
        this._d = this._baseConvert(str.split("").map(function(d){
            return +d;
        }).reverse(), 10, this.base);
    },
    _fromNumber: function(n) {
        this.negative = n < 0;
        return this._apply([Math.abs(n)]);
    },
    _get: function(idx) {
        return +(idx < this._d.length ? this._d[idx] : 0);
    },
    _pad: function(idx) {
        if (idx < this.limit) {
            while (this._d.length <= idx) {
                this._d.push(0);
            }
        }
       return this;
    },
    _apply: function(array) {
        var carry = 0;
        for (var i=0,len=array.length;i<len;i++){
            var val = array[i] + carry;
            carry = this._set(i, val);
        }
        while (carry > 0 || carry < 0) {
            carry = this._set(i, carry);
            i++;
        }
        return this;
    },
    _set: function(idx, val) {
        var carry;
        this._pad(idx);
        this._d[idx] += val % this.base;
        carry = (val < 0) ? Math.ceil(val/this.base) : Math.floor(val/this.base);
        if (this._d[idx] < 0) {
            this._d[idx] += this.base;
            carry--;
        }
        return carry;
    }
};

module.exports = BigInt;

function trace(obj) {
    var keys = Object.keys(obj);
    keys.forEach(function(key){
        var desc = Object.getOwnPropertyDescriptor(obj, key);
        // if (desc.get || desc.set) return;
        if (typeof desc.value === "function") {
            var fn = desc.value;
            
            desc.value = function(){
                var args = [].slice.call(arguments,0);
                console.log.apply(console, [this,key].concat(args));
                return fn.apply(this, args);
            };
            
            Object.defineProperty(obj, key, desc);
        }
    });
}

// trace(BigInt.prototype);




