console.time("exec time");
import { readFileSync } from "fs";

var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const data = array.map((i) => toInt(i.split("")));

const createTree = (data) => {
  let tree = {};
  data.forEach((row, i) => {
    row.forEach((point, j) => {
      tree[[i, j]] = find_neighbours(data, [i, j]);
    });
  });
  return tree;
};

const find_neighbours = (data, point) => {
  const n = data.length;
  let list = [];
  let i = point[0];
  let j = point[1];

  if (i - 1 > 0) {
    list.push([[i - 1, j], data[i - 1][j]]);
  }
  if (j - 1 > 0) {
    list.push([[i, j - 1], data[i][j - 1]]);
  }
  if (i + 1 < n) {
    list.push([[i + 1, j], data[i + 1][j]]);
  }
  if (j + 1 < n) {
    list.push([[i, j + 1], data[i][j + 1]]);
  }
  return list;
};

const real_cave = (data) => {
  let n = data.length;
  let cave = new Array(5 * n);
  for (let i = 0; i < 5 * n; i++) {
    let to_add = new Array(5 * n);
    cave[i] = to_add;
  }
  data.forEach((row, i) =>
    row.forEach((value, j) => {
      for (let k = 0; k < 5; k++) {
        for (let l = 0; l < 5; l++) {
          if (value + l + k <= 9) {
            cave[i + k * n][j + l * n] = value + l + k;
          } else {
            cave[i + k * n][j + l * n] = (value + k + l) % 9;
          }
        }
      }
    })
  );
  return cave;
};

const solution = (data) => {
  let n = data.length;
  let P = new Array(n);
  for (let i = 0; i < n; i++) {
    let to_add = new Array(n);
    for (let j = 0; j < n; j++) {
      to_add[j] = true;
    }
    P[i] = to_add;
  }
  let points = new Array(n);
  for (let i = 0; i < n; i++) {
    let to_add = new Array(n);
    points[i] = to_add;
  }
  data.forEach((row, i) =>
    row.forEach((value, j) => (points[i][j] = [Infinity, false]))
  );
  points[0][0] = [0, false];
  const tree = createTree(data);
  let end = data.length * data.length;

  let i = 0;
  let points_min = [[[0, 0], 0]];
  while (i < end) {
    if (i % 100 === 0) {
      console.log(i);
    }
    i++;
    let res = points_min.pop();
    let point_min = res[0];
    let dist_point_min = res[1];
    P[point_min[0]][point_min[1]] = false;
    tree[point_min].forEach((i) => {
      let neighbour = i[0];
      let distance = i[1];
      if (P[neighbour[0]][neighbour[1]]) {
        if (points[neighbour[0]][neighbour[1]][0] > dist_point_min + distance) {
          points[neighbour[0]][neighbour[1]][0] = dist_point_min + distance;
          if (!points[neighbour[0]][neighbour[1]][1]) {
            points_min.push([neighbour, dist_point_min + distance]);
            points[neighbour[0]][neighbour[1]][1] = true;
          } else {
            for (let j = 0; j < points_min.length; j++) {
              if (
                points_min[j][0][0] === neighbour[0] &&
                points_min[j][0][1] === neighbour[1]
              ) {
                points_min[j] = [neighbour, dist_point_min + distance];
              }
            }
          }
        }
      }
    });
    points_min.sort((a, b) => b[1] - a[1]);
  }
  return points[data.length - 1][data.length - 1][0];
};

console.log(solution(data));
console.timeEnd("exec time");
