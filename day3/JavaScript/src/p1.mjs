import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let bst = array.reduce(
  (acc, val) => {
    for (let i = 0; i < val.length; i++) {
      if (parseInt(val.charAt(i), 10) === 1) {
        acc[i][1] = acc[i][1] + 1;
      } else {
        acc[i][0] = acc[i][0] + 1;
      }
    }

    return acc;
  },
  Array.from({ length: array[0].length }, () => [0, 0])
);

console.log(bst);

const gamma = (dt) => {
  let mar = dt.map((val) => {
    if (val[0] > val[1]) {
      return 0;
    } else {
      return 1;
    }
  });
  return mar;
};

const epsilon = (dt) => {
    let mar = dt.map((val) => {
      if (val[0] < val[1]) {
        return 0;
      } else {
        return 1;
      }
    });
    return mar;
  };


let g = gamma(bst).reduce((acc,val)=>{
    return (acc + String(val));



},"");
let e = epsilon(bst).reduce((acc,val)=>{
    return (acc + String(val));
    


},"");

console.log(parseInt(g,2)*parseInt(e,2))
