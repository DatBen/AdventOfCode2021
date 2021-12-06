import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const lTab = (arr) => {
  let res = [];
  let stock = [];
  arr = arr.splice(2, arr.length);

  arr.forEach((el) => {
    if (el == "") {
      res.push(stock);
      stock = [];
    } else {
      let nt = [];
      el.split(" ").forEach((vl) => {
        if (vl !== "") {
          nt.push(vl);
        }
      });

      stock.push(nt);
    }
  });

  return res;
};

const winTest = (grid, numb) => {
  let end = Array.from({ length: 10 }, () => []);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (!numb.includes(grid[i][j])) {
        end[i].push(grid[i][j]);
        end[5 + j].push(grid[i][j]);
      }
    }
  }
  let res = end.reduce((acc, val) => {
    if (val.length == 0) {
      acc = true;
      return acc;
    } else {
      return acc;
    }
  }, false);
  return res;
};

const bingo_win = (array) => {
  let num = array[0].split(",");
  let grids = lTab(array);
  let flag = true;
  let win = undefined;
  let i = 0;
  let vrb = [];

  while (flag) {
    vrb.push(num[i]);

    grids.forEach((el) => {
      if (winTest(el, vrb)) {
        win = el;
        flag = false;
      }
    });

    i++;
  }

  console.log(i);
  return [win, vrb];
};

let res = bingo_win(array);
console.log(res);

const getScore = (w, v) => {
  let s1 = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (!v.includes(w[i][j])) {
        s1 = s1 + parseInt(w[i][j], 10);
      }
    }
  }
  return s1 * v[v.length - 1];
};

console.log(getScore(res[0], res[1]));
