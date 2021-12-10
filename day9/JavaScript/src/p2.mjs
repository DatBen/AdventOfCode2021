console.timeEnd("exec time");
console.time("exec time");
import { readFileSync } from "fs";
var array = readFileSync("data/i").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));
array = array.map((vl) => {
  return toInt(vl.split(""));
});

const isTrou = (arr, x, y) => {
  if (x == 0) {
    if (y == 0) {
      return arr[y][x] < arr[y][x + 1] && arr[y][x] < arr[y + 1][x];
    }
    if (y == arr.length - 1) {
      return arr[y][x] < arr[y - 1][x] && arr[y][x] < arr[y][x + 1];
    }
    return (
      arr[y][x] < arr[y - 1][x] &&
      arr[y][x] < arr[y][x + 1] &&
      arr[y][x] < arr[y + 1][x]
    );
  }
  if (x == arr[0].length - 1) {
    if (y == 0) {
      return arr[y][x] < arr[y][x - 1] && arr[y][x] < arr[y + 1][x];
    }
    if (y == arr.length - 1) {
      return arr[y][x] < arr[y - 1][x] && arr[y][x] < arr[y][x - 1];
    }
    return (
      arr[y][x] < arr[y - 1][x] &&
      arr[y][x] < arr[y][x - 1] &&
      arr[y][x] < arr[y + 1][x]
    );
  }
  if (y == 0) {
    return (
      arr[y][x] < arr[y + 1][x] &&
      arr[y][x] < arr[y][x + 1] &&
      arr[y][x] < arr[y][x - 1]
    );
  }
  if (y == arr.length - 1) {
    return (
      arr[y][x] < arr[y - 1][x] &&
      arr[y][x] < arr[y][x + 1] &&
      arr[y][x] < arr[y][x - 1]
    );
  }

  return (
    arr[y][x] < arr[y - 1][x] &&
    arr[y][x] < arr[y][x + 1] &&
    arr[y][x] < arr[y][x - 1] &&
    arr[y][x] < arr[y + 1][x]
  );
};

let ij = Array.from({ length: array[0].length }, (_, i) => i);
let y = Array.from({ length: array.length }, (_, i) => i);
ij = ij
  .map((vl) => {
    return y.map((v) => {
      return [vl, v];
    });
  })
  .flat();

let min = ij.reduce((acc, vl) => {
  if (isTrou(array, vl[0], vl[1])) {
    return [...acc, vl];
  } else {
    return acc;
  }
}, []);

const getPt = (arr, pt) => {
  return arr[pt[1]][pt[0]];
};

const getNei = (arr, pt) => {
  let x = pt[0];
  let y = pt[1];
  if (x == 0) {
    if (y == 0) {
      return [[y,x+1], [y + 1,x]];
    }
    if (y == arr.length - 1) {
      return [[y - 1,x], [y,x + 1]];
    }
    return [[y - 1,x], [y,x + 1], [y + 1,x]];
  }
  if (x == arr[0].length - 1) {
    if (y == 0) {
      return [[y,x - 1], [y + 1,x]];
    }
    if (y == arr.length - 1) {
      return [[y - 1,x], [y,x - 1]];
    }
    return [[y - 1,x], [y,x - 1], [y + 1,x]];
  }
  if (y == 0) {
    return [y + 1,x], [y,x + 1], [y,x - 1];
  }
  if (y == arr.length - 1) {
    return [[y - 1,x], [y,x + 1], [y,x - 1]];
  }
  return [[y - 1,x], [y,x + 1], [y,x - 1],[y+1,x]]
};

const basin = (arr, pt, set) => {
  if (getPt(arr, pt) == 9) {
    return set;
  }
};

console.log(getNei(array,[50,50]));

console.timeEnd("exec time");
