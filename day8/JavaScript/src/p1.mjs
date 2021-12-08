import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const data = array
  .map((i) => i.split(" | "))
  .map((i) => [i[0].split(" "), i[1].split(" ")]);

const decode = (digit) => {
  if (digit.length === 2) {
    return 1;
  }
  if (digit.length === 4) {
    return 4;
  }
  if (digit.length === 3) {
    return 7;
  }
  if (digit.length === 7) {
    return 8;
  }
  return -1;
};

const find_solution = (data) => {
  return data.reduce(
    (res, value) =>
      value[1].reduce((count, i) => {
        if (decode(i) != -1) {
          return count + 1;
        }
        return count;
      }, 0) + res,
    0
  );
};

console.log(find_solution(data));
