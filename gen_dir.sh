#!/bin/bash


for i in {1..10}
do
echo "Building directory $i... "
mkdir day$i
cd day$i

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
done
exit 0