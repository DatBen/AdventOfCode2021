console.time('exec time')

import { readFileSync } from "fs";
var array = readFileSync("data/data.txt").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));
array = toInt(array);

const res = array.reduce(
  (res, i) => {
    if (i > res[1]) {
      return [res[0] + 1, i];
    }
    return [res[0], i];
  },
  [-1, 0]
);

console.log(res[0]);


console.timeEnd('exec time')
