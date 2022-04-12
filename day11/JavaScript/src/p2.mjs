console.time("exec time");
import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const data = array.map((i) => toInt(i.split("")));

const add_1 = (board) => {
  let list_9 = [];
  let new_board = board.map((row, i) =>
    row.map((col, j) => {
      if (col + 1 > 9) {
        list_9.push([i, j]);
      }
      return col + 1;
    })
  );
  return [new_board, list_9];
};

const find9 = (board, list) => {
  let list9 = [];
  board.forEach((row, i) =>
    row.forEach((col, j) => {
      if (col > 9) {
        if (!est_dans([i, j], list)) {
          list9.push([i, j]);
        }
      }
    })
  );
  return list9;
};

const add_1_arround = (i, board) => {
  let list_9 = [];
  let points_arround = arround(i, board.length);
  points_arround.forEach((element) => {
    board[element[0]][element[1]] = board[element[0]][element[1]] + 1;
  });

  return board;
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

const arround = (i, length) => {
  let res = [];
  if (i[0] + 1 < length) {
    if (i[1] - 1 >= 0) {
      res.push([i[0] + 1, i[1] - 1]);
    }
    if (i[1] + 1 < length) {
      res.push([i[0] + 1, i[1] + 1]);
    }
    res.push([i[0] + 1, i[1]]);
  }
  if (i[1] + 1 < length) {
    res.push([i[0], i[1] + 1]);
  }
  if (i[0] - 1 >= 0) {
    if (i[1] - 1 >= 0) {
      res.push([i[0] - 1, i[1] - 1]);
    }
    if (i[1] + 1 < length) {
      res.push([i[0] - 1, i[1] + 1]);
    }
    res.push([i[0] - 1, i[1]]);
  }
  if (i[1] - 1 >= 0) {
    res.push([i[0], i[1] - 1]);
  }
  return res;
};

const next_step = (data) => {
  let [new_board, last_list_9] = add_1(data);
  let list_9 = last_list_9;
  let add = [];
  do {
    add = [];
    last_list_9.forEach((element) => {
      new_board = add_1_arround(element, new_board);
      let to_add = find9(new_board, list_9);
      to_add.forEach((value) => {
        if (!est_dans(value, list_9)) {
          list_9.push(value);
        }
        add.push(value);
      });
    });
    last_list_9 = add;
  } while (last_list_9.length != 0);

  list_9.forEach((element) => {
    new_board[element[0]][element[1]] = 0;
  });
  return [new_board, list_9.length];
};

const solution = (data) => {
  let i = 1;
  while (true) {
    let next = next_step(data);
    data = next[0];
    if (next[1] === data.length * data.length) {
      return i;
    }
    i++;
  }
};

console.log(solution(data));

console.timeEnd("exec time");
