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

let upgraded_dic = (data, n) => {
  let dic = create_dic(data);
  for (let key in dic) {
    dic[key] = grow_n_times(key, n);
  }
  return dic;
};

const grow = (polymere) => {
  let dic = create_dic(data);
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

const create_count_dic = (dic) => {
  let index = {};
  for (let key in dic) {
    let to_add = {};
    dic[key].forEach((letter) => {
      if (to_add[letter] === undefined) {
        to_add[letter] = 1;
      } else {
        to_add[letter]++;
      }
    });
    index[key] = to_add;
  }
  return index;
};

const split = (list) => {
  let res = [];
  list.forEach((value, index) => {
    res.push(list.slice(index, index + 2));
  });
  res.pop();
  return res;
};

const grow_upgrated_dic = (polymere, dic) => {
  let new_polymere = [];
  for (let i = 0; i < polymere.length - 2; i++) {
    let to_add = dic[polymere[i] + polymere[i + 1]].slice();
    to_add.pop();
    new_polymere.push(to_add);
  }
  new_polymere.push(
    dic[polymere[polymere.length - 2] + polymere[polymere.length - 1]]
  );

  return new_polymere.flat();
};

const recursion = (polymere, i, index, upgraded_dic, count_dic) => {
  if (i > 1) {
    let splited = split(polymere);

    splited.forEach((element) =>
      recursion(
        grow_upgrated_dic(element, upgraded_dic),
        i - 1,
        index,
        upgraded_dic,
        count_dic
      )
    );
  }
  if (i === 1) {
    let splited = split(polymere);
    splited.forEach((element) => {
      let count = count_dic[element[0] + element[1]];
      for (let key in count) {
        if (index[key] === undefined) {
          index[key] = count[key];
        } else {
          index[key] = index[key] + count[key];
        }
      }
      index[element[1]]--;
    });
    index["last"] = polymere[polymere.length - 1];
  }
};

const solution = (polymere) => {
  let count = { last: "" };
  let max = 0;
  let min = undefined;
  let dic = upgraded_dic(data, 20);
  let count_dic = create_count_dic(dic);
  recursion(polymere, 2, count, dic, count_dic);
  count[count["last"]]++;
  for (let key in count) {
    if (key != "last") {
      if (min === undefined || count[key] < min) {
        min = count[key];
      }
      if (count[key] > max) {
        max = count[key];
      }
    }
  }

  return max - min;
};

console.log(solution(base));

console.timeEnd("exec time");
