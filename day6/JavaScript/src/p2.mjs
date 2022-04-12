console.time("exec time");

import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

array = toInt(array[0].split(","));

let sim = Array.from({ length: 9 }, () => 0);

const cvt = (arr, sim) => {
  arr.forEach((element) => {
    sim[element]++;
  });
  return sim;
};

const oneDay = (sim) => {
  let res = Array.from({ length: 9 }, () => 0);
  for (let i = 0; i < 8; i++) {
    res[i] = sim[i + 1];
  }
  res[6] = sim[0] + res[6];
  res[8] = res[8] + sim[0];
  return res;
};

const simu = (n, sim) => {
  for (let i = 0; i < n; i++) {
    sim = oneDay(sim);
  }
  console.log(sim);
  return sim.reduce((acc, vl) => acc + vl);
};

console.log(simu(256, cvt(array, sim)));

console.timeEnd("exec time");
