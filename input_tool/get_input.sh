#!/bin/bash

sqlite3 /home/*/.mozilla/firefox/*.default-release/cookies.sqlite < sql_command


node parse.mjs

rm cookie
dir=$PWD
cd ../day$1/JavaScript/data

wget --load-cookies $dir/cookie.txt https://adventofcode.com/2021/day/$1/input
cd $dir

rm cookie.txt