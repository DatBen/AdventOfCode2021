import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let dict = {
  ">": "<",
  ")": "(",
  "}": "{",
  "]": "[",
};
let dict2 = {
  "<": ">",
  "(": ")",
  "{": "}",
  "[": "]",
};

const isCloser = (ent) => {
  if (dict[ent] === undefined) {
    return false;
  } else {
    return true;
  }
};

const lastW = (line) => {
  line = line.split("");
  let pile = [];
  let i = 0;
  while (i < line.length) {
    let el = line[i];
    if (!isCloser(el)) {
      pile.push(el);
    } else {
      if (pile[pile.length - 1] === dict[el]) {
        pile.pop();
      } else {
        return true;
      }
    }
    i++;
  }
  return false;
};

const complet = (line) => {
  line = line.split("");
  let pile = [];
  let i = 0;
  while (i < line.length) {
    let el = line[i];
    if (!isCloser(el)) {
      pile.push(el);
    } else {
      pile.pop();
    }
    i++;
  }

  return pile
    .reduce((acc, vl) => {
      acc.push(dict2[vl]);
      return acc;
    }, [])
    .reverse();
};

const score = (ent) => {
  let s = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  let res = s[ent];
  if (res === undefined) {
    res = 0;
  }
  return res;
};

const clean = (array) => {
  let res = [];
  array.forEach((element) => {
    if (!lastW(element)) {
      res.push(element);
    }
  });
  return res;
};


const calc_score = (line) => {
  let res = complet(line);
  return res.reduce((acc, vl) => {
    return acc * 5 + score(vl);
  }, 0);
};

const p2 = (arr) => {
  arr = clean(arr);
  arr = arr.map((vl) => {
    return calc_score(vl);
  });

  return(
    arr.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
  );
};

let res = p2(array)
let mid = Math.floor(res.length/2)
console.log(res[mid])
