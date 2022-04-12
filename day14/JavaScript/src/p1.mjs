console.time("exec time");
import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let base = array[0].split("");
const data = array.splice(1).map((element) => element.split(" -> "));

const create_dic = (data) => {
  let dic = {};
  data.forEach((element) => {
    dic[element[0]] = element[1];
  });
  return dic;
};

let dic = create_dic(data);

const grow = (polymere) => {
  let new_polymere = [];
  for (let i = 0; i < polymere.length - 1; i++) {
    new_polymere.push(polymere[i]);
    new_polymere.push(dic[polymere[i] + polymere[i + 1]]);
  }
  new_polymere.push(polymere[polymere.length - 1]);
  return new_polymere;
};

const grow_n_times = (polymere, n) => {
  for (let i = 0; i < n; i++) {
    polymere = grow(polymere);
  }
  return polymere;
};

const max_min = (polymere) => {
  let dic = {};
  let max = 0;
  let min = polymere.length;
  polymere.forEach((letter) => {
    if (dic[letter] === undefined) {
      dic[letter] = 1;
    } else {
      dic[letter]++;
    }
    if (dic[letter] > max) {
      max = dic[letter];
    }
  });
  for (let key in dic) {
    if (dic[key] < min) {
      min = dic[key];
    }
  }
  return max - min;
};

const solution = (polymer) => {
  polymer = grow_n_times(polymer, 10);
  return max_min(polymer);
};

console.log(solution(base));

console.timeEnd("exec time");
