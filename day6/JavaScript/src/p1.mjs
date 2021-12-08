console.time("exec time");

import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

array = toInt(array[0].split(","));

const fishSticks = (timer) => {
  if (timer === 0) {
    return [6, true];
  } else {
    return [timer - 1, false];
  }
};

const oneDay = (arr) => {
  let nfishs = 0;
  let res = arr.map((vl) => {
    let cal = fishSticks(vl);
    if (cal[1]) {
      nfishs++;
    }
    return cal[0];
  });
  for (let i = 0; i < nfishs; i++) {
    res.push(8);
  }
  return res;
};

const simu = (n, arr) => {
  for (let i = 0; i < n; i++) {
    arr = oneDay(arr);
  }
  return arr.length;
};

console.log(simu(80, array));

console.timeEnd("exec time");
