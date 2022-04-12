console.time("exec time");

import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const data = toInt(array[0].split(","));

function numMedian(a) {
  a = a.slice(0).sort(function (x, y) {
    return x - y;
  });
  var b = (a.length + 1) / 2;
  return a.length % 2 ? a[b - 1] : (a[b - 1.5] + a[b - 0.5]) / 2;
}

const fuel_cost = (data) => {
  const med = numMedian(data);

  return data.reduce((res, value) => Math.abs(med - value) + res, 0);
};

console.log(fuel_cost(data));
console.timeEnd("exec time");
