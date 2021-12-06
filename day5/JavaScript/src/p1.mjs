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

const init_board = (data) => {
  let init = [];
  let board = [];
  for (let i = 0; i < 1000; i++) {
    init.push(0);
  }
  for (let i = 0; i < 1000; i++) {
    board.push(init);
  }

  data.forEach((vents) => {
    if (vents[0][0] === vents[1][0]) {
      let points = range(vents[0][1], vents[1][1]);
      points.forEach((j) => {
        board[vents[0][0]][j] = board[vents[0][0]][j] + 1;
      });
    } else if (vents[0][1] === vents[1][1]) {
      let points = range(vents[0][0], vents[1][0]);
      points.forEach((j) => {
        board[j][vents[0][1]] = board[j][vents[0][1]] + 1;
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
