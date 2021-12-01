import { readFileSync } from "fs";
var array = readFileSync("cookie").toString().split("\n");

array=array.split("|");


console.log(array)