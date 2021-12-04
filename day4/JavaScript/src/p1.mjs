import { readFileSync } from "fs";
var array = readFileSync("data/data.txt").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const draw = toInt(array[0].split(","));

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

const boards = init_boards();
console.log(boards);
