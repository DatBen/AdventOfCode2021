console.time("exec time");

import { readFileSync } from "fs";

var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const bst = (array) => {
  return array.reduce(
    (acc, val) => {
      for (let i = 0; i < val.length; i++) {
        if (parseInt(val.charAt(i), 10) === 1) {
          acc[i][1] = acc[i][1] + 1;
        } else {
          acc[i][0] = acc[i][0] + 1;
        }
      }

      return acc;
    },
    Array.from({ length: array[0].length }, () => [0, 0])
  );
};

const max = (a) => {
  if (a[0] > a[1]) {
    return "0";
  } else {
    return "1";
  }
};

const min = (a) => {
  if (a[0] <= a[1]) {
    return "0";
  } else {
    return "1";
  }
};

const oxy_find = (arr) => {
  let flag = true;
  let stock = [];
  let i = 0;
  while (flag) {
    let v = max(bst(arr)[i]);
    arr.forEach((el) => {
      if (el.charAt(i) === v) {
        stock.push(el);
      }
    });
    if (stock.length === 1) {
      flag = false;
      arr = stock;
    } else {
      i++;
      arr = stock;
      stock = [];
    }
  }
  return arr;
};

const c02_find = (arr) => {
  let flag = true;
  let stock = [];
  let i = 0;
  while (flag) {
    let v = min(bst(arr)[i]);
    arr.forEach((el) => {
      if (el.charAt(i) === v) {
        stock.push(el);
      }
    });
    if (stock.length === 1) {
      flag = false;
      arr = stock;
    } else {
      i++;
      arr = stock;
      stock = [];
    }
    console.log("tgjhgk");
    console.log(arr);
  }
  return arr;
};

let o = oxy_find(array);
let c = c02_find(array);

console.log(o);
console.log(c);

console.log(parseInt(o, 2) * parseInt(c, 2));

console.timeEnd("exec time");
