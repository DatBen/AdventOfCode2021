import { readFileSync } from 'fs';
var array = readFileSync('data/input').toString().split('\n');
const toInt = (arr) => arr.map((i) => parseInt(i, 10));import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let grid = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => 0)
);

const tLine = (entry, grid) => {
  entry = entry.split(" ");
  let c1 = entry[0].split(",");
  let c2 = entry[2].split(",");
  let max = 0;
  c1 = toInt(c1);
  c2 = toInt(c2);
  if (c1[0] === c2[0]) {
    let od = [c1[1], c2[1]].sort();
    for (let i = od[0]; i < od[1] + 1; i++) {
      grid[c1[0]][i]++;
      if (grid[c1[0]][i] > max) {
        max = grid[c1[0]][i];
      }
    }
  }
  if (c1[1] === c2[1]) {
    let od = [c1[0], c2[0]].sort();
    for (let i = od[0]; i < od[1] + 1; i++) {
      grid[i][c1[1]]++;
      if (grid[i][c1[1]] > max) {
        max = grid[i][c1[1]];
      }
    }
  }
  return [grid, max];
};

const compute = (arr, grid) => {
  let max = 0;

  arr.forEach((el) => {
    let ctr = tLine(el, grid);
    grid = ctr[0];
    if (ctr[1] > max) {
      max = ctr[1];
    }
  });

  return [grid,max];
};


const numB=(max,grid)=>{
    let cpt =0;
    
}