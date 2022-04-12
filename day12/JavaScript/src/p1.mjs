console.time("exec time");
import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

array = array.map((vl) => {
  return vl.split("-");
});

const isUp = (character) => {
  if (character == character.toUpperCase()) {
    return true;
  }
  if (character == character.toLowerCase()) {
    return false;
  }
};

const getConnected = (cave, arr, set) => {
  return arr.reduce((acc, vl) => {
    if (vl[0] == cave) {
      if (!set.includes(vl[1])) {
        acc.push(vl[1]);
      }
      return acc;
    }
    if (vl[1] == cave) {
      if (!set.includes(vl[0])) {
        acc.push(vl[0]);
      }
      return acc;
    }
    return acc;
  }, []);
};

const cloner = (l) => {
  let clone = [];
  l.forEach((element) => {
    clone.push(element);
  });

  return clone;
};

const nbPath = (cave, arr, set, debug) => {
  let clone = cloner(debug)
  clone.push(cave);
  let setClone = cloner(set)
  if (cave === "end") {
    console.log(clone);

    return 1;
  } else {
    if (cave === "start" || !isUp(cave)) {
      setClone.push(cave);
    }
    let c = getConnected(cave, arr, setClone);
    return c.reduce((acc, stp) => {
      return acc + nbPath(stp, arr, setClone, clone);
    }, 0);
  }
};

console.log(nbPath("start", array, [], []));

console.timeEnd("exec time");
