#!/bin/bash

sqlite3 /home/manu/.mozilla/firefox/jfubr9dg.default-release/cookies.sqlite < sql_command 

node parse.mjs

rm cookie

wget --load-cookies cookie.txt https://adventofcode.com/2021/day/$1/input

rm cookie.txt