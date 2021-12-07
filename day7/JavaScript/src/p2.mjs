import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const file = toInt(array[0].split(","));

const sum = (int) => {
  return (int * (int + 1)) / 2;
};

const solution = (data) => {
  const max = Math.max(...data);
  let res = data.reduce((res, value) => sum(value) + res, 0);
  for (let i = 1; i <= max; i++) {
    let temp = data.reduce((res, value) => sum(Math.abs(i - value)) + res, 0);
    if (temp < res) {
      res = temp;
    }
  }
  return res;
};

console.log(solution(file));
