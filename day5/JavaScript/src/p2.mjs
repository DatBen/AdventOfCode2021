import { readFileSync } from 'fs';
var array = readFileSync('data/input').toString().split('\n');
const toInt = (arr) => arr.map((i) => parseInt(i, 10));