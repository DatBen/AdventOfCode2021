console.time("exec time");
import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));


const data = array.map((i) => toInt(i.split("")));

const find_low_points = (data) => {
  const map_arround = data.map((value, i) => {
    let row = value.map((point, j) => {
      let res = [];
      if (j < value.length - 1) {
        res.push(value[j + 1]);
      }
      if (j > 0) {
        res.push(value[j - 1]);
      }
      if (i > 0) {
        res.push(data[i - 1][j]);
      }
      if (i < data.length - 1) {
        res.push(data[i + 1][j]);
      }
      return [point, res];
    });
    return row;
  });
  let low_points = map_arround
    .flat()
    .filter((i) => i[1].every((value) => value > i[0]))
    .map((i) => i[0]);
  return low_points;
};

const solution = (data) => {
  return find_low_points(data).reduce((res, value) => res + value + 1, 0);
};

console.log(solution(data));

console.timeEnd("exec time");
