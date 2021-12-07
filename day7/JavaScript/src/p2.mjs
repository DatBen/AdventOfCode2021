import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

array = toInt(array[0].split(","));

const max = (arr) => {
  return arr.reduce((acc, vl) => {
    if (vl > acc) {
      return vl;
    } else {
      return acc;
    }
  });
};

const abs = (num) => {
  if (num >= 0) {
    return num;
  } else {
    return -num;
  }
};
const test_pos = (n, arr) => {
  return arr.reduce((acc, vl) => {
    return (acc + (abs(vl - n))*(abs(vl - n)+1)/2);
  }, 0);
};

const min_fuel = (arr) => {
  let maxx = max(arr);

  let min = -1;

  for (let i = 0; i < maxx + 1; i++) {
    let res = test_pos(i, arr);
    if (res < min || min === -1) {
      min = res;
    }
  }
  return min;
};

console.log(min_fuel(array));
