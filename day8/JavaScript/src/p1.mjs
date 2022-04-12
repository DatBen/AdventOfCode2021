import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const numB = (line) => {
  let cpt = 0;
  line = line.split(" | ")[1].split(" ");
  line.forEach((element) => {
    if (
      element.length === 2 ||
      element.length === 3 ||
      element.length === 7 ||
      element.length === 4
    ) {
      cpt++;
    }
  });

  return cpt;
};

const answ = (array) => {
  return array.reduce((acc, vl) => {
    return acc + numB(vl);
  }, 0);
};

console.log(answ(array));
