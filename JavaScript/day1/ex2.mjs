import { readFileSync } from "fs";
var array = readFileSync("data.txt").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));
array = toInt(array);

let data = array.slice(0, 1998).map((value, i) => array.slice(i, i + 3));
data = data.map((value) => value.reduce((res, i) => res + i, 0));

const res = data.reduce(
  (res, i) => {
    if (i > res[1]) {
      return [res[0] + 1, i];
    }
    return [res[0], i];
  },
  [-1, 0]
);

console.log(res);
