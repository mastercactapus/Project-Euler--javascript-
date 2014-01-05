var assert = require("assert");

var BigInt = require("./bigint2");


assert.equal(new BigInt(825).toString(),"825");
assert.equal(new BigInt(-825).toString(),"-825");
assert.equal(new BigInt(10).add(1).toString(),"11");
assert.equal(new BigInt(9999).add(9999).toString(),"19998");

assert.equal(new BigInt(10).sub(1).toString(),"9");
assert.equal(new BigInt(10).sub(-1).toString(),"11");

assert.equal(new BigInt(10).add(-1).toString(),"9");
assert.equal(new BigInt(10).add(-11).toString(),"-1");
assert.equal(new BigInt(-10).add(11).toString(),"1");
assert.equal(new BigInt(-9999).add(9999).toString(),"0");

assert.equal(new BigInt(-10).sub(11).toString(),"-21");
assert.equal(new BigInt(-9999).sub(9999).toString(),"-19998");
assert.equal(new BigInt(-9999).sub(-9999).toString(),"0");
assert.equal(new BigInt(-9999).add(-9999).toString(),"-19998");


assert.equal(new BigInt(-10).add(-11).toString(),"-21");
assert.equal(new BigInt(0).toString(),"0");
assert.equal(new BigInt(0).add(-1).toString(),"-1");
assert.equal(new BigInt(0).add(1).toString(),"1");
assert.equal(new BigInt(-1).add(1).toString(),"0");
assert.equal(new BigInt(1).add(-1).toString(),"0");




assert.equal(new BigInt(2).mul(3).toString(),"6");
assert.equal(new BigInt(100).mul(6).toString(),"600");
assert.equal(new BigInt(101).mul(6).toString(),"606");


assert.equal(new BigInt(20).mul(30).toString(),"600");
assert.equal(new BigInt(100).mul(100).toString(),"10000");

assert.equal(new BigInt(9).mul(9).toString(),"81");
assert.equal(new BigInt(9).mul(99).toString(),"891");

assert.equal(new BigInt(99).mul(99).toString(),"9801");


assert.equal(new BigInt(25934).mul(5643).toString(),"146345562");
assert.equal(new BigInt(25934).mul(5643).toString(),"146345562");
assert.equal(new BigInt(25934).mul(5643).toString(),"146345562");
assert.equal(new BigInt(25934).mul(5643).toString(),"146345562");

assert.equal(new BigInt(-2).mul(3).toString(),"-6");
assert.equal(new BigInt(-2).mul(-3).toString(),"6");


assert.equal(new BigInt(400).eq(400), true);
assert.equal(new BigInt(-400).eq(400), false);
assert.equal(new BigInt(2).eq(4), false);
assert.equal(new BigInt(2).eq(2), true);

assert.equal(new BigInt(400).lt(400), false);
assert.equal(new BigInt(-400).lt(400), true);
assert.equal(new BigInt(2).lt(4), true);
assert.equal(new BigInt(2).lt(2), false);

assert.equal(new BigInt(400).lte(400), true);
assert.equal(new BigInt(-400).lte(400), true);
assert.equal(new BigInt(2).lte(4), true);
assert.equal(new BigInt(2).lte(2), true);

assert.equal(new BigInt(400).gt(400), false);
assert.equal(new BigInt(-400).gt(400), false);
assert.equal(new BigInt(2).gt(4), false);
assert.equal(new BigInt(2).gt(2), false);

assert.equal(new BigInt(400).gte(400), true);
assert.equal(new BigInt(-400).gte(400), false);
assert.equal(new BigInt(2).gte(4), false);
assert.equal(new BigInt(2).gte(2), true);

assert.equal(new BigInt(5).pow(2).toString(), "25");
assert.equal(new BigInt(5).pow(3).toString(), "125");
assert.equal(new BigInt(13).pow(13).toString(), "302875106592253");
assert.equal(new BigInt(123).pow(123).toString(), "114374367934617190099880295228066276746218078451850229775887975052369504785666896446606568365201542169649974727730628842345343196581134895919942820874449837212099476648958359023796078549041949007807220625356526926729664064846685758382803707100766740220839267");


assert.equal(new BigInt(25).div(5).toString(), "5");
assert.equal(new BigInt(100).div(2).toString(), "50");
assert.equal(new BigInt(33).div(30).toString(), "1");
assert.equal(new BigInt(33).div(40).toString(), "0");
assert.equal(new BigInt(40098).div(100).toString(), "400");


assert.equal(new BigInt(25).mod(5).toString(), "0");
assert.equal(new BigInt(100).mod(2).toString(), "0");
assert.equal(new BigInt(33).mod(30).toString(), "3");
assert.equal(new BigInt(33).mod(40).toString(), "33");

assert.equal(new BigInt(25).toInteger(), 25);
assert.equal(new BigInt(100).toInteger(), 100);
assert.equal(new BigInt(33).toInteger(), 33);
assert.equal(new BigInt(33).toInteger(), 33);


assert.equal(new BigInt(10).div(-2).toString(), "-5");
assert.equal(new BigInt(-10).div(-2).toString(), "5");
assert.equal(new BigInt(-10).div(2).toString(), "-5");

assert.equal(new BigInt(11).mod(-2).toString(), "-1");
assert.equal(new BigInt(-11).mod(-2).toString(), "1");
assert.equal(new BigInt(-11).mod(2).toString(), "-1");








