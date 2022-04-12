console.time("exec time");
import { readFileSync } from "fs";
import { isAsyncFunction } from "util/types";
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

const nbPath = (cave, arr, set, double, debug, ans) => {
  let clone = cloner(debug);
  clone.push(cave);
  let setClone = cloner(set);
  if (cave === "end") {
    ans.push(clone);

    return ans;
  } else {
    if (cave === "start") {
      setClone.push(cave);
      let c = getConnected(cave, arr, setClone);
      c.forEach((vl) => {
        ans = nbPath(vl, arr, setClone, 0, clone, ans);
      });
      return ans;
    }
    if (!isUp(cave)) {
      if (double === 1) {
        setClone.push(cave);
        let c = getConnected(cave, arr, setClone);
        c.forEach((vl) => {
          ans = nbPath(vl, arr, setClone, 1, clone, ans);
        });
        return ans;
      } else {
        let c = getConnected(cave, arr, setClone);
        let setclone2 = cloner(setClone);
        setclone2.push(cave);

        c.forEach((stp) => {
          ans = nbPath(stp, arr, setClone, 1, clone, ans);
          ans = nbPath(stp, arr, setclone2, 0, clone, ans);
        });

        return ans;
      }
    }
    let c = getConnected(cave, arr, setClone);

    c.forEach((stp) => {
      ans = nbPath(stp, arr, setClone, double, clone, ans);
    });

    return ans;
  }
};

let ans = nbPath("start", array, [], 0, [], []);

const clean = (arr) => {
  return arr.map((vl) => {
    return vl.reduce((acc, st) => {
      return acc + st;
    }, "");
  });
};

const elim = (arr) => {
  console.log(arr.length);
  let vide = [];
  arr.forEach((vl) => {
    if (!vide.includes(vl)) {
      vide.push(vl);
    }
  });
  return vide;
};



console.log("test");
console.log("######");
ans = clean(ans);

console.log(elim(ans).length);

console.timeEnd("exec time");
