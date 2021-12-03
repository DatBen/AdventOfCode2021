import { readFileSync } from "fs";
var array = readFileSync("data/data.txt").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let ox = array;
let co = array;

const reduce_ox = (arr, i) => {
  let res = arr.reduce(
    (res, value) => {
      if (value[i] === "0") {
        return [res[0] + 1, res[1]];
      }
      return [res[0], res[1] + 1];
    },
    [0, 0]
  );

  if (res[1] >= arr.length / 2) {
    return "1";
  }

  return "0";
};

const reduce_co = (arr, i) => {
  let res = arr.reduce(
    (res, value) => {
      if (value[i] === "0") {
        return [res[0] + 1, res[1]];
      }
      return [res[0], res[1] + 1];
    },
    [0, 0]
  );
  if (res[0] >= arr.length / 2) {
    return "0";
  }
  return "1";
};

let index = 0;
while (ox.length > 1) {
  let res = reduce_ox(ox, index);

  ox = ox.filter((value) => value[index] === res);
  index++;
}
index = 0;
while (co.length > 1) {
  let res = reduce_co(co, index);
  co = co.filter((value) => value[index] === res);
  index++;
}

console.log(parseInt(ox, 2) * parseInt(co, 2));
