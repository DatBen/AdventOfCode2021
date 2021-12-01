#!/bin/bash



echo "Building directory $i... "
mkdir day$1
cd day$1

mkdir JavaScript
cd JavaScript



npm init --yes


mkdir src

cd src

touch p1.mjs
echo "import { readFileSync } from "fs";
var array = readFileSync("data.txt").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));" > p1.mjs
touch p2.mjs

echo "import { readFileSync } from "fs";
var array = readFileSync("data.txt").toString().split("\n");
const toInt = (arr) => arr.map((i) => parseInt(i, 10));" > p2.mjs


cd ..


cd ..


cd ..

exit 0