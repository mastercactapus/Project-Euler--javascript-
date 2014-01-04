//js max 9007199254740992

function BigInt(n, opts) {
    opts = opts||{};
    var str = false;
    if (n instanceof BigInt) {
        this.base = opts.base || n.base;
        this.digits = n.digits.slice(0);
    } else if (n instanceof Array) {
        this.base = opts.base||10;
        this.digits = n.slice(0);
    } else if (typeof n === "number") {
        this.base = opts.base||10;
        this.digits = [0,0];
        var neg = false;
        if (n < 0) neg=true,n = Math.abs(n);
        this._set(0,n,true);
        if (neg) this.digits = this._neg();
    } else {
        this.base = opts.base||10;
        str = true;
        this.digits = n.toString().split("").reverse();
        if (this.digits[this.digits.length-1] === "-") {
            this.digits[this.digits.length-1] = 0;
            this.digits = this._neg();
        } else {
            this.digits.push(0);
        }
        this.digits = this.digits.map(function(digit){
            return +digit;
        });
    }

    if (opts.pad) {
        this._pad(opts.pad);
    }
    if (str && this.base !== 10) {
        this.base = 10;
        return this.toBase(this.base);
    }
}

BigInt.prototype = {
    toBase: function(base) {
        var out = new(BigInt)(0,{base:base});
  
        var res = this._div(base);
        var i = 0;
        out._add(0, res[1].toInteger(), true);
        
        while (res[0].gt(0)) {
            i++;
            res = res[0]._div(base);
            out._pad(i+1);
            out._add(i, res[1].toInteger(), true);
        }
        return out;
    },
    new: function(n) {
        if (typeof n === "number") {
            n = new BigInt(n,{base: this.base});   
        } else {
            n = new BigInt(n);
        }
        
        return n.base === this.base ? n : n.toBase(this.base);
    },
    add: function(n) {
        n = this.new(n);

        var len = Math.max(n.digits.length,this.digits.length) + 1;
        var out = new BigInt(0, {pad:len,base:this.base});

        for (var i=0;i<=len;i++){
             out._add(i, this._get(i) + n._get(i));
        }

        return out;
    },
    sub: function(n) {
        return this.add(this.new(n)._neg());
    },
    mul: function(n) {
       n = this.new(n);
       
        var len = n.digits.length + this.digits.length - 2;
        var out = new BigInt(0, {pad:len,base:this.base});

        for (var i_n=0,n_len=n.digits.length;i_n<=n_len;i_n++){
            for (var i_this=0,this_len=this.digits.length;i_this<=this_len;i_this++){
                out._add(i_n + i_this, this._get(i_this) * n._get(i_n));
            }
        }
        return out;
    },
    div: function(n){
        return this._div(n)[0];
    },
    mod: function(n){
        return this._div(n)[1];  
    },
    _div: function(n) {
       n = this.new(n);
       
       var rem = new BigInt(this);
       var out = this.new(0);
       var inc = this.new(1);
       while (rem.gte(n)) {
           rem = rem.sub(n);
           out = out.add(inc);
       }
       
       return [out,rem];
    },
    _cmp: function(n,cmp) {
       n = this.new(n);
       
        var len = Math.max(n.digits.length, this.digits.length);
        if (this._get(len) === n._get(len)) {
            
            for (var i = len;i>0;i--) {
                if (this._get(i) !== n._get(i)) return cmp(this._get(i), n._get(i));
            }
            return cmp(this._get(0), n._get(0));
        } else {
            return cmp(n._get(len), this._get(len));
        }
    },
    _lt: function(a,b) {
        return a<b;
    },
    _gt: function(a,b) {
        return a>b;
    },
    _lte: function(a,b) {
        return a<=b;
    },
    _gte: function(a,b) {
        return a>=b;
    },
    lt: function(n) {
        return this._cmp(n, this._lt);  
    },
    gt: function(n) {
        return this._cmp(n, this._gt);  
    },
    lte: function(n) {
        return this._cmp(n, this._lte);  
    },
    gte: function(n) {
        return this._cmp(n, this._gte);  
    },
    eq: function(n) {
       n = this.new(n);
       
        var len = Math.max(n.digits.length, this.digits.length);

        for (var i =0;i<len;i++) {
            if (n._get(i) !== this._get(i)) return false;
        }
        return true;
    },
    pow: function(n) {
       n = this.new(n);
       var inc = this.new(1);
        
        if (n.eq(0)) return inc;
        
        var out = new BigInt(this);
        for (var c = new BigInt(1); c.lt(n); c=c.add(inc)) {
            out = out.mul(this);
        }
        
        return out;
    },
    toString: function() {
        if (this.base !== 10) {
            return this.toBase(10).toString();   
        }
        if (this.digits[this.digits.length-1] === 9) {
            return "-" + this._neg().slice(0).reverse().join("").replace(/^0+(.)/,"$1");
        } else {
            return this.digits.slice(0).reverse().join("").replace(/^0+(.)/,"$1");
        }
    },
    toInteger: function() {
        var digits = this.digits, neg = false;
        if (this.digits[this.digits.length-1] === this.base-1) {
            digits = this._neg();
            neg=true;
        }
        
        var out = 0;
        
        for (var i=0;i<digits.length;i++){
            out += Math.pow(this.base, i) * digits[i];
        }
        
        return neg ? -out : out;
        
    },
    _get: function(i) {
        return +((i < this.digits.length) ? this.digits[i] : this._last);
    },
    _set: function(idx,val,pad){
        var carry = val;
        for (var i=idx;i<this.digits.length;i++) {
            if (pad) this._pad(i+1);
            this.digits[i] = carry % this.base;
            carry = Math.floor(carry/this.base) + this._get(i + 1);
            if (carry === 0) break;
        }
        return this;
    },
    _add: function(idx,val,pad){
        return this._set(idx, this._get(idx) + (+val), pad);
    },
    get _last() {
        return this.digits[this.digits.length-1];
    },
    _pad: function(length) {
        for (var i=0,len=length + 1 - this.digits.length;i<len;i++){
            this.digits.push(this._last);
        }
    },
    _sigDigits: function() {
        for (var i=this.digits.length-1;i>=0;i--) {
            if (this.digits[i] !== this._last) return i+1;   
        }
        return 0;
    },
    _neg: function() {
        var carry = 1;
        var self = this;
        var neg = this.digits.map(function(digit){
            var val = self.base-1-digit+carry;
            if (val === self.base) {
                val=0;
                carry = 1;
            } else {
                carry = 0;
            }
            return val;
        });
        return neg;

    }
};

module.exports = BigInt;
