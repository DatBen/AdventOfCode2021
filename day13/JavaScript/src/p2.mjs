console.time("exec time");
import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const format = (arr) => {
  let pt = [];
  let instruction = [];
  let flag = true;
  arr.forEach((ele) => {
    if (ele === "") {
      flag = false;
    } else if (flag) {
      pt.push(toInt(ele.split(",")));
    } else {
      instruction.push(ele.split(" ")[2]);
    }
  });
  instruction = instruction.map((vl) => {
    vl = vl.split("=");
    vl[1] = parseInt(vl[1], 10);
    return vl;
  });

  let frt = {
    pts: pt,
    inst: instruction,
  };

  return frt;
};

const simUp = (pt, y) => {
  if (pt[1] < y) {
    return pt;
  } else {
    return [pt[0], 2 * y - pt[1]];
  }
};

const simLeft = (pt, x) => {
  if (pt[0] < x) {
    return pt;
  } else {
    return [2 * x - pt[0], pt[1]];
  }
};

const cleaner = (l) => {
  let single = [];
  let verifier = [];
  l.forEach((vl) => {
    let srt = "" + vl[0] + "," + vl[1];
    if (!verifier.includes(srt)) {
      verifier.push(srt);
      single.push(vl);
    }
  });

  return single;
};

const folder = (frt) => {
  let load = frt.inst[0];
  let neew = [];
  if (load[0] === "y") {
    frt.pts.forEach((vl) => {
      neew.push(simUp(vl, load[1]));
    });
  } else {
    frt.pts.forEach((vl) => {
      neew.push(simLeft(vl, load[1]));
    });
  }

  frt.pts = cleaner(neew);
  frt.inst.shift();
  return frt;
};

const decode = (frt) => {
  frt = format(frt);
  while (frt.inst.length > 0) {
    frt = folder(frt);
  }
  return frt;
};

const isPt = (frt, x, y) => {
  let pts = frt.pts;
  return pts.reduce((acc, vl) => {
    if (vl[0] === x && vl[1] === y) {
      return true;
    } else {
      return acc;
    }
  }, false);
};

const printer = (frt, xm, ym) => {
  for (let y = 0; y < ym; y++) {
    let ligne = "";
    for (let x = 0; x < xm; x++) {
      if (isPt(frt, x, y)) {
        ligne = ligne + "#";
      } else {
        ligne = ligne + " ";
      }
    }
    console.log(ligne);
  }
};

let a = decode(array);
console.log(a);
printer(a,100,10)

console.timeEnd("exec time");
