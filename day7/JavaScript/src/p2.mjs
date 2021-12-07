import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const data = toInt(array[0].split(","));

const mean = (a) => {
  return Math.round(a.reduce((res, value) => value + res, 0) / a.length);
};

const sum = (int) => {
  return (int * (int + 1)) / 2;
};

const fuel_cost = (data) => {
  const moy = mean(data);

  return data.reduce((res, value) => sum(Math.abs(moy - value)) + res, 0);
};

console.log(fuel_cost([16, 1, 2, 0, 4, 2, 7, 1, 2, 14]));
