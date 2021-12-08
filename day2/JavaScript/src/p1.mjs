console.time('exec time');

import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let x=0;
let depth=0;
console.log(array)
for (let i =0;i<array.length;i++){

    let vl = array[i].split(" ")
    switch (vl[0]) {
        case "forward":
            x=x+parseInt(vl[1],10);
            break;
        case "up":
            depth=depth-parseInt(vl[1],10) 
            break;
        case "down":
            depth=depth+parseInt(vl[1],10)    
    }


}
console.log(x)
console.log(depth)


console.timeEnd('exec time');

        



