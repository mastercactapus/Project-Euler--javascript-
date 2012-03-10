var bigint = require("bigint");
var data=new Array();

for (var a=2;a<=100;a++){
 for (var b=2;b<=100;b++){
  var res=bigint(a).pow(b);
  if (data.indexOf(res.toString())==-1) 
data.push(res.toString());
 }
}

console.log(data.length);
