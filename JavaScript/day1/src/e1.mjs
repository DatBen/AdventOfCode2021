// Importing the fs module
import fs from "fs";

// Intitializing the readFileLines with the file
const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

// Calling the readFiles function with file name

let arr = readFileLines("data/input.txt");
let pred;
let act;

let c=0;




for (let i=1;i<2000;i++){
    pred=arr[i-1];
    act=arr[i];

    if (act>pred){
        c++;
    }





}




console.log(c);