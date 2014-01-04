var assert = require("assert");

var BigInt = require("./bigint");


assert.equal(new BigInt(825).toString(),"825");
assert.equal(new BigInt(-825).toString(),"-825");
assert.equal(new BigInt(10).add(1).toString(),"11");
assert.equal(new BigInt(10).add(-1).toString(),"9");
assert.equal(new BigInt(10).add(-11).toString(),"-1");
assert.equal(new BigInt(-10).add(11).toString(),"1");

assert.equal(new BigInt(9999).add(9999).toString(),"19998");
assert.equal(new BigInt(-9999).add(9999).toString(),"0");
assert.equal(new BigInt(-9999).add(-9999).toString(),"-19998");


assert.equal(new BigInt(-10).add(-11).toString(),"-21");
assert.equal(new BigInt(0).toString(),"0");
assert.equal(new BigInt(0).add(-1).toString(),"-1");
assert.equal(new BigInt(0).add(1).toString(),"1");
assert.equal(new BigInt(-1).add(1).toString(),"0");
assert.equal(new BigInt(1).add(-1).toString(),"0");


assert.equal(new BigInt(10).sub(-1).toString(),"11");
assert.equal(new BigInt(10).sub(1).toString(),"9");


assert.equal(new BigInt(2).mul(3).toString(),"6");
assert.equal(new BigInt(100).mul(6).toString(),"600");
assert.equal(new BigInt(101).mul(6).toString(),"606");


assert.equal(new BigInt(20).mul(30).toString(),"600");
assert.equal(new BigInt(100).mul(100).toString(),"10000");

assert.equal(new BigInt(9).mul(9).toString(),"81");
assert.equal(new BigInt(9).mul(99).toString(),"891");

assert.equal(new BigInt(99).mul(99).toString(),"9801");


assert.equal(new BigInt(25934).mul(5643).toString(),"146345562");

assert.equal(new BigInt(-2,{pad:4}).mul(3).toString(),"-6");
assert.equal(new BigInt(-2).mul(-3).toString(),"6");


assert.equal(new BigInt(400).eq(400), true);
assert.equal(new BigInt(-400).eq(400), false);
assert.equal(new BigInt(2).eq(4), false);
assert.equal(new BigInt(2,{pad:9}).eq(2), true);

assert.equal(new BigInt(400).lt(400), false);
assert.equal(new BigInt(-400).lt(400), true);
assert.equal(new BigInt(2).lt(4), true);
assert.equal(new BigInt(2,{pad:9}).lt(2), false);

assert.equal(new BigInt(400).lte(400), true);
assert.equal(new BigInt(-400).lte(400), true);
assert.equal(new BigInt(2).lte(4), true);
assert.equal(new BigInt(2,{pad:9}).lte(2), true);

assert.equal(new BigInt(400).gt(400), false);
assert.equal(new BigInt(-400).gt(400), false);
assert.equal(new BigInt(2).gt(4), false);
assert.equal(new BigInt(2,{pad:9}).gt(2), false);

assert.equal(new BigInt(400).gte(400), true);
assert.equal(new BigInt(-400).gte(400), false);
assert.equal(new BigInt(2).gte(4), false);
assert.equal(new BigInt(2,{pad:9}).gte(2), true);

assert.equal(new BigInt(5).pow(2).toString(), "25");
assert.equal(new BigInt(5).pow(3).toString(), "125");
assert.equal(new BigInt(13).pow(13).toString(), "302875106592253");










