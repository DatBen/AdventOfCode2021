import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const data = array
  .map((i) => i.split(" | "))
  .map((i) => [i[0].split(" "), i[1].split(" ")]);

const decode = (digit) => {
  if (digit.length === 2) {
    return [digit, 1];
  }
  if (digit.length === 4) {
    return [digit, 4];
  }
  if (digit.length === 3) {
    return [digit, 7];
  }
  if (digit.length === 7) {
    return [digit, 8];
  }
  return -1;
};

const create_dictionary = (entry) => {
  const base = entry.map((i) => decode(i));
  let dic;
  let huit = base.find((i) => i[1] == 8)[0];
  let un = base.find((i) => i[1] == 1)[0];
  let quatre = base.find((i) => i[1] == 4)[0];
  let sept = base.find((i) => i[1] == 7)[0];
  let haut = soustraction(setp, un);
  let bas_droit = soustraction(
    soustraction(huit, haut),
    soustracion(huit, sept)
  );
  let haut_droit = soustraction(
    soustraction(quatre, soustraction(quatre, un)),
    bas
  );
  let six = soustraction(huit, haut_droit);
};

const soustraction = (a, b) => {
  let res = "";
  for (let i = 0; i < a.length; i++) {
    if (!b.includes(a[i])) {
      res = res + a[i];
    }
  }
  return res;
};

console.log(create_dictionary(["dab", "ab"]));
