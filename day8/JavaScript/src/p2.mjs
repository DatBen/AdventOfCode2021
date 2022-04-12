import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

const lineDeco = (line) => {
  let lt = line.split(" | ")[0].split(" ");
  return lt;
};

const getEasy = (lt, dict) => {
  lt.forEach((element) => {
    switch (element.length) {
      case 2:
        dict["1"] = element;
        break;
      case 3:
        dict["7"] = element;
        break;
      case 7:
        dict["8"] = element;
        break;
      case 4:
        dict["4"] = element;
        break;
    }
  });

  return dict;
};

const creatDico = (line) => {
  let dict = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };
  return dict;
};

const contain = (qui, ou) => {
  let flag = true;
  for (let i = 0; i < qui.length; i++) {
    if (!ou.includes(qui.charAt(i))) {
      flag = false;
    }
  }
  return flag;
};

const get6 = (lt, dict) => {
  lt.forEach((el) => {
    if (el.length === 6) {
      if (contain(dict["4"], el)) {
        dict["9"] = el;
      } else if (contain(dict["7"], el)) {
        dict["0"] = el;
      } else {
        dict["6"] = el;
      }
    }
  });

  return dict;
};

const get5 = (lt, dict) => {
  lt.forEach((el) => {
    if (el.length === 5) {
      if (contain(dict["7"], el)) {
        dict["3"] = el;
      } else if (contain(el, dict["9"])) {
        dict["5"] = el;
      } else {
        dict["2"] = el;
      }
    }
  });

  return dict;
};

const decrypt = (line) => {
  line = lineDeco(line);
  let tes = creatDico(line);
  tes = getEasy(line, tes);
  tes = get6(line, tes);
  tes = get5(line, tes);

  return tes;
};

const returnNum = (dict, mot) => {
  for (let i = 0; i < 10; i++) {
    if (mot.length === dict[i].length) {
      if (contain(mot, dict[i])) {
        return i;
      }
    }
  }
};

const prompt_line = (line) => {
  let dict = decrypt(line);
  let output = line.split(" | ")[1].split(" ");
  return output.reduce((acc, vl) => {
    return acc + returnNum(dict, vl);
  }, "");
};

console.log(
  array.reduce((acc, vl) => {
    return acc + parseInt(prompt_line(vl), 10);
  }, 0)
);
