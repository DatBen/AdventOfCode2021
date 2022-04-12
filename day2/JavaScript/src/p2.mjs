console.time('exec time');


import { readFileSync } from "fs";
var array = readFileSync("data/input").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

let x=0;
let depth=0;
let aim=0;
for (let i =0;i<array.length;i++){

    let vl = array[i].split(" ")
    switch (vl[0]) {
        case "forward":
            x=x+parseInt(vl[1],10);
            depth=depth+aim*parseInt(vl[1],10);
            break;
        case "up":
            aim=aim-parseInt(vl[1],10) 
            break;
        case "down":
            aim=aim+parseInt(vl[1],10)    
    }


}

console.log(x*depth)


console.timeEnd('exec time');

        



