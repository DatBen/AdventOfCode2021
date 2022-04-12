#!/bin/bash



echo "Building directory $i... "
mkdir day$1
cd day$1

mkdir JavaScript
cd JavaScript



npm init --yes

echo '{
  "name": "javascript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "1": "node src/p1.mjs",
    "2": "node src/p2.mjs"

  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
' > package.json


mkdir src

cd src

touch p1.mjs
echo "console.time('exec time');
import { readFileSync } from 'fs';
var array = readFileSync('data/input').toString().split('\n');
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

console.timeEnd('exec time');" >> p1.mjs
touch p2.mjs

echo "console.time('exec time');
import { readFileSync } from 'fs';
var array = readFileSync('data/input').toString().split('\n');
const toInt = (arr) => arr.map((i) => parseInt(i, 10));

console.timeEnd('exec time');" >> p2.mjs


cd ..

mkdir data



cd ..

mkdir Go
cd Go

mkdir src

cd src
touch p1.go
echo 'package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"time"
)

func main() {
	start := time.Now()
	defer fmt.Println("execution time = ", time.Since(start))
	input := read_file("data/input")	
	fmt.Println(input)
}

func read_file(name string) [][]string {
	var tab [][]string
	file, err := os.Open(name)
	if err != nil {
		log.Fatalf("Error when opening file: %s", err)
	}
	fileScanner := bufio.NewScanner(file)
	for fileScanner.Scan() {
		var to_add []string
		to_add = append(to_add, fileScanner.Text())
		tab = append(tab, to_add)
	}
	if err := fileScanner.Err(); err != nil {
		log.Fatalf("Error while reading file: %s", err)
	}
	file.Close()
	return tab
}
' >> p1.go


touch p2.go
echo 'package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"time"
)

func main() {
	start := time.Now()
	defer fmt.Println("execution time = ", time.Since(start))
	input := read_file("data/input")
	fmt.Println(input)
}

func read_file(name string) [][]string {
	var tab [][]string
	file, err := os.Open("name")
	if err != nil {
		log.Fatalf("Error when opening file: %s", err)
	}
	fileScanner := bufio.NewScanner(file)
	for fileScanner.Scan() {
		var to_add []string
		to_add = append(to_add, fileScanner.Text())
		tab = append(tab, to_add)
	}
	if err := fileScanner.Err(); err != nil {
		log.Fatalf("Error while reading file: %s", err)
	}
	file.Close()
	return tab
}
' >> p2.go

cd ..

mkdir data



cd ..



cd ..

cd input_tool

./get_input.sh $1 Go
./get_input.sh $1 JavaScript

cd ..

exit 0