import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let dict = {
  ">": "<",
  ")": "(",
  "}": "{",
  "]": "[",
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
        return el;
      }
    }
    i++;
  }
  return pile;
};

const score = (ent) => {
  let s = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  let res = s[ent];
  if (res === undefined) {
    res = 0;
  }
  return res;
};

const p1 = (arr) => {
  return arr.reduce((acc,vl)=>{
    return acc+score(lastW(vl))

  },0)
};

