import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let bst = array.reduce(
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

const max = (a) => {
  if (a[0] > a[1]) {
    return "0";
  } else {
    return "1";
  }
};

const oxy_find = (bt, arr) => {
  let flag = true;
  let stock = [];
  let i = 0;
  while (flag) {
    let v = max(bt[i]);
    arr.forEach((el) => {
      if (el.charAt(i) === v) {
        stock.push(el);
      }
    });
    if (stock.length === 1) {
      flag = false;
    } else {
      i++;
      stock = [];
    }
  }
  return stock;
};


console.log(oxy_find(bst,array))