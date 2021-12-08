
import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const data = array.map((i) => {
  let row = i.split("->");
  return [toInt(row[0].split(",")), toInt(row[1].split(","))];
});

const range = (a, b) => {
  let list = [];
  if (a >= b) {
    for (let i = b; i <= a; i++) {
      list.push(i);
    }
  } else {
    for (let i = a; i <= b; i++) {
      list.push(i);
    }
  }
  return list;
};

const range_diag = (vents) => {
  let list = [];
  let sign_x = Math.sign(vents[1][0] - vents[0][0]);
  let sign_y = Math.sign(vents[1][1] - vents[0][1]);
  for (let a = 0; a <= Math.abs(vents[0][0] - vents[1][0]); a++) {
    list.push([vents[0][0] + sign_x * a, vents[0][1] + sign_y * a]);
  }
  return list;
};

const is_diag = (vents) => {
  if (
    Math.abs(vents[0][0] - vents[1][0]) === Math.abs(vents[0][1] - vents[1][1])
  ) {
    return true;
  }
  return false;
};

const init_board = (data) => {
  let board = [];
  for (let i = 0; i < 1000; i++) {
    let add = [];
    for (let j = 0; j < 1000; j++) {
      add.push(0);
    }
    board.push(add);
  }
  data.forEach((vents) => {
    if (vents[0][0] === vents[1][0]) {
      let points = range(vents[0][1], vents[1][1]);
      points.forEach((j) => {
        board[vents[0][0]][j]++;
      });
    } else if (vents[0][1] === vents[1][1]) {
      let points = range(vents[0][0], vents[1][0]);

      points.forEach((j) => {
        board[j][vents[0][1]]++;
      });
    } else if (is_diag(vents)) {
      let points = range_diag(vents);
      points.forEach((j) => {
        board[j[0]][j[1]]++;
      });
    }
  });
  return board;
};

let board = init_board(data);

const solution = board.flat().reduce((res, value) => {
  if (value >= 2) {
    return res + 1;
  }
  return res;
}, 0);

console.log(solution);
