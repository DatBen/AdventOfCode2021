console.time("exec time");

import { readFileSync } from "fs";

var array = readFileSync("data/data.txt").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const init_boards = () => {
  let boards = [];
  for (let i = 0; i < 100; i++) {
    let board = [];
    for (let j = 0; j < 5; j++) {
      let row = toInt(array[i * 6 + 2 + j].split(" ").filter((i) => i != ""));
      board.push(row);
    }
    boards.push(board);
  }
  return boards;
};

const transpose = (board) => {
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
};

const has_won = (board, drawn) => {
  if (drawn.lenght < 5) {
    return false;
  }
  const transposed = transpose(board);
  for (let i = 0; i < 5; i++) {
    if (board[i].every((element) => drawn.includes(element))) {
      return true;
    }
    if (transposed[i].every((element) => drawn.includes(element))) {
      return true;
    }
  }
  return false;
};

const solution = (board, drawn) => {
  let sum = board.flat().reduce((res, element) => {
    if (drawn.includes(element)) {
      return res;
    } else {
      return res + element;
    }
  }, 0);
  return sum * drawn[drawn.length - 1];
};

const draw = toInt(array[0].split(","));
const boards = init_boards();
let i = 5;
let unfounded = true;
let winning_board;
let drawn;

while (i <= draw.length && unfounded) {
  drawn = draw.slice(0, i);
  winning_board = boards.find((element) => has_won(element, drawn));
  if (winning_board != undefined) {
    unfounded = false;
  }
  i++;
}

console.log(solution(winning_board, drawn));

console.timeEnd("exec time");
