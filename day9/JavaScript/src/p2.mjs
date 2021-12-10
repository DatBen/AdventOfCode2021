console.timeEnd("exec time");
console.time("exec time");
import { readFileSync } from "fs";
import { get } from "https";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));
array = array.map((vl) => {
  return toInt(vl.split(""));
});
const getPt = (arr, pt) => {
  return arr[pt[1]][pt[0]];
};

const incl = (l, pt) => {
  if (l.length == 0) {
    return false;
  }
  return l.reduce((acc, vl) => {
    if (vl[0] === pt[0] && vl[1] === pt[1]) {
      return true;
    } else {
      return acc;
    }
  }, false);
};

const getNei = (arr, pt) => {
  let x = pt[0];
  let y = pt[1];
  if (x == 0) {
    if (y == 0) {
      return [
        [x, y + 1],
        [x + 1, y],
      ];
    }
    if (y == arr.length - 1) {
      return [
        [x, y - 1],
        [x + 1, y],
      ];
    }
    return [
      [x, y - 1],
      [x, y + 1],
      [x + 1, y],
    ];
  }
  if (x == arr[0].length - 1) {
    if (y == 0) {
      return [
        [x, y + 1],
        [x - 1, y],
      ];
    }
    if (y == arr.length - 1) {
      return [
        [x - 1, y],
        [x, y - 1],
      ];
    }
    return [
      [x - 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
  }
  if (y == 0) {
    return [
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
    ];
  }
  if (y == arr.length - 1) {
    return [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
    ];
  }
  return [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
  ];
};

const isTrou = (arr, pt) => {
  return getNei(arr, pt).reduce((acc, vl) => {
    if (getPt(arr, pt) >= getPt(arr, vl)) {
      return false;
    } else {
      return acc;
    }
  }, true);
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
  if (isTrou(array, vl)) {
    return [...acc, vl];
  } else {
    return acc;
  }
}, []);

const basin = (arr, pt, set) => {
  if (getPt(arr, pt) == 9 || incl(set, pt)) {
    return set;
  } else {
    set.push(pt);
    getNei(arr, pt).forEach((vl) => {
      set = basin(arr, vl, set);
    });
  }

  return set;
};
console.log(min.length);
const ans = (array, min) => {
  min = min.map((vl) => {
    return basin(array, vl, []).length;
  });
  let max = [0, 0, 0];
  let id = 0;
  max.forEach((_, i) => {
    min.forEach((l, j) => {
      if (l > max[i]) {
        max[i] = l;
        id = j;
      }
    });

    min.splice(id, 1);
  });
  console.log(max);
  console.log(
    max.reduce((acc, vl) => {
      return acc * vl;
    }, 1)
  );
};
ans(array, min);

console.timeEnd("exec time");
