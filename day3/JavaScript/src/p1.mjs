import { readFileSync } from "fs";
var array = readFileSync("data/data.txt").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const reduce_i = (arr, i) => {
  let res = arr.reduce(
    (res, value) => {
      if (value[i] === "0") {
        return [res[0] + 1, res[1]];
      }
      return [res[0], res[1] + 1];
    },
    [0, 0]
  );
  if (res[0] > 500) {
    return 0;
  }
  return 1;
};
let gamma = 0;

for (let i = 0; i < 12; i++) {
  gamma = gamma + reduce_i(array, i) * Math.pow(2, 11 - i);
}
console.log(gamma * (Math.pow(2, 12) - gamma));
