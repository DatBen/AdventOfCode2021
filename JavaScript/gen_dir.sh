#!/bin/bash


for i in {1..25}
do
echo "Building directory $i... "
mkdir day$i
cd day$i
touch README.md
echo "day $i directory" > README.md
cd ..
done
exit 0