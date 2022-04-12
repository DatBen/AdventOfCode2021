
console.time("exec time");
import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const data = array.map((i) => toInt(i.split("")));

const find_low_points = (data) => {
  const map_arround = data.map((value, i) => {
    let row = value.map((point, j) => {
      let res = [];
      if (j < value.length - 1) {
        res.push(value[j + 1]);
      }
      if (j > 0) {
        res.push(value[j - 1]);
      }
      if (i > 0) {
        res.push(data[i - 1][j]);
      }
      if (i < data.length - 1) {
        res.push(data[i + 1][j]);
      }
      return [point, [i, j], res];
    });
    return row;
  });
  let low_points = map_arround
    .flat()
    .filter((i) => i[2].every((value) => value > i[0]))
    .map((i) => [i[0], i[1]]);
  return low_points;
};

const est_dans = (i, list) => {
  let res = false;
  list.forEach((element) => {
    if (i[0] === element[0] && i[1] === element[1]) {
      res = true;
    }
  });
  return res;
};

const find_bassins = (data) => {
  let low_points = find_low_points(data);
  let index = -1;
  let bassins = low_points.map((value) => {
    let res = [];
    let last_list = [value];
    let add_list;
    index++;
    do {
      add_list = [];
      last_list.forEach((element) => {
        if (!res.includes(element)) {
          res.push([element]);
        }
        let i = element[1][0];
        let j = element[1][1];

        if (j < data[0].length - 1) {
          if (element[0] < data[i][j + 1]) {
            add_list.push([data[i][j + 1], [i, j + 1]]);
          }
        }
        if (j > 0) {
          if (element[0] < data[i][j - 1]) {
            add_list.push([data[i][j - 1], [i, j - 1]]);
          }
        }
        if (i > 0) {
          if (element[0] < data[i - 1][j]) {
            add_list.push([data[i - 1][j], [i - 1, j]]);
          }
        }
        if (i < data.length - 1) {
          if (element[0] < data[i + 1][j]) {
            add_list.push([data[i + 1][j], [i + 1, j]]);
          }
        }

        last_list = add_list;
      });
    } while (add_list.length > 0);
    res = res.flat();
    let temp = [];
    let final = [];
    res.forEach((element) => {
      if (!est_dans(element[1], temp)) {
        temp.push(element[1]);
        if (element[0] != 9) {
          final.push(element);
        }
      }
    });
    return final;
  });
  return bassins;
};

const solution = (data) => {
  let bassins = find_bassins(data);
  bassins = bassins.sort((a, b) => b.length - a.length);
  return bassins[0].length * bassins[1].length * bassins[2].length;
};

console.log(solution(data));
console.timeEnd("exec time");
