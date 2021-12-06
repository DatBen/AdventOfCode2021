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

const bingo_win = (grids, num) => {
  let flag = true;
  let win = undefined;
  let vind = 0;
  let i = 0;
  let vrb = [];
  let ind = -1;

  while (flag) {
    vrb.push(num[i]);
    ind = -1;
    grids.forEach((el) => {
      ind++;
      if (winTest(el, vrb)) {
        win = el;
        vind = ind;
        flag = false;
      }
    });

    i++;
  }

  console.log(i);
  return [win, vrb, vind];
};

const last = (arr) => {
  let num = arr[0].split(",");
  arr = lTab(arr);

  while (arr.length > 1) {
    console.log(arr.length);
    let r = bingo_win(arr, num);

    arr.splice(r[2], 1);
  }

  return arr;
};

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

//console.log(getScore(res[0], res[1]));




let a = last(array);

console.log(a)

let num = array[0].split(",");
console.log(num)



const numt = (g,n) => {
    let i =0;
    let st=[];
    let flag =false;
    while (!flag) {
        st.push(n[i])
        i++;
        flag = winTest(g,st);
    }
    return st
}

console.log(numt(a[0],num))


console.log(getScore(a[0], numt(a[0],num)));

