
var base = 10;

function BigInt(n) {
    this._d = [0];
    if (typeof n === "number") {
        this._fromNumber(n);
    } else if (typeof n === "string") {
        this._fromString(n);
    } else if (n instanceof BigInt) {
        this._d = n._d.slice(0);
        this.negative = n.negative;
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
            this._baseConvert(this._d.slice(0,this.len), base, 10).reverse().join("");
    },
    toInteger: function() {
        var out = 0;
        var len =this.len;
        for (var i=0;i<len;i++){
            out += Math.pow(base, i) * this._get(i);
        }
        
        return this.negative ? -out : out;
    },
    mul: function(n) {
        n = this.new(n);
        var out = new BigInt(0);
        out.neg = this.neg !== n.neg;
        
        for (var _n=0;_n<n.len;_n++) {
            for (var _t=0;_t<this.len;_t++) {
                out._put(_n+_t, n._get(_n) * this._get(_t));
            }
        }
        return out;
    },
    
    add: function(n) {
        n = this.new(n);
        return n.neg === this.neg ? this._add(n) : this._sub(n);
    },
    sub: function(n) {
        n = this.new(n);
        return n.neg === this.neg ? this._sub(n) : this._add(n);
    },
    zero: function() {
        return this.len === 1 && this._d[0] === 0;
    },
    _add: function(n) {
        var len = Math.max(this._d.length, n._d.length);
        var out = new BigInt(this);
        for (var i=0;i<=len;i++){
            out._set(i, out._get(i) + n._get(i));
        }
        return out;
    },
    _sub: function(n) {
        var len = Math.max(n._d.length, this._d.length);
        var i;
        var out = new BigInt(this);
        if (out._lt(n)) {
            out.negative = !out.negative;
            for (i=0;i<len;i++){
                out._set(i, n._get(i) - out._get(i));
            }
        } else {
            for (i=0;i<len;i++){
                out._put(i, -n._get(i));
            }
        }
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
        return this._cmp(n, function(a,b){
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
    

    new: function(n) {
        return new BigInt(n);
    },
    get len() {
        for (var i=this._d.length-1;i>=0;i--){
            if (this._d[i] !== 0) return i+1;
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
        if (fromRadix !== 10 || toRadix!==10)
            throw new TypeError("baseConvert not implemented");
            
        return array;
    },
    
    _fromString: function(str) {
        this.negative = str[0] === "-" ? (str = substr(1), true) : false;
        this._d = this._baseConvert(str.split("").map(function(d){
            return +d;
        }).reverse(), 10, base);
    },
    _fromNumber: function(n) {
        this.negative = n < 0;
        return this._set(0,Math.abs(n));
    },
    _get: function(idx) {
        return idx < this._d.length ? this._d[idx] : 0;
    },
    _pad: function(idx) {
       while (this._d.length <= idx) {
           this._d.push(0);
       }
       return this;
    },
    _set: function(idx, val) {
        if (val === 0 && idx >= this._d.length) return this;
        this._pad(idx);
        this._d[idx] = val % base;
        if (this._d[idx] < 0) {
            this._d[idx] += base;
            this._put(idx+1, -1);
        }

        return this._put(idx+1, val < 0 ? Math.ceil(val/base) : Math.floor(val/base));

    },
    _put: function(idx, val) {
        return this._set(idx, this._get(idx)+val);
    }
};

module.exports = BigInt;
