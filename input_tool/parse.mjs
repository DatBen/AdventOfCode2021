import { readFileSync, writeFileSync } from "fs";
var array = readFileSync("cookie").toString().split("\n");
array=array.slice(1,array.length-1);

array = array.map((val) => {
  return val.split("|");
});

const toCookie = (ck) => {
  let flag;

  if (parseInt(ck[9], 10) === 1) {
    flag = "TRUE";
  } else {
    flag = "FALSE";
  }

  let line =
    ck[4] +
    "\t" +
    "TRUE" +
    "\t/\t" +
    flag +
    "\t" +
    ck[6] +
    "\t" +
    ck[2] +
    "\t" +
    ck[3] +
    "\n";
  return line;
};

let data = "# Netscape HTTP Cookie File\n\n";

array.forEach((val) => {
  data = data + toCookie(val);
});

console.log(data);

writeFileSync('cookie.txt',data)
