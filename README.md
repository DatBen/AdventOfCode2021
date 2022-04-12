# AdventOfCode2021

participating to https://adventofcode.com/

## EQUIPE <a href=https://github.com/mines-nancy/advent-of-code-2021/tree/main/Le_Gang> LE GANG </a>

### Members

- Manu SERPETTE

- Benjamin DUMONT

#### Commande :


- To generate the directory of the day i and get the input: ` ./gen_dir i`

for JS:

- To run day n°i part j : `./run_day js i j`
- To run unit test (if exist) for day n°i : `./run_test js i j`

for GO:

- To run day n°i part j : `./run_day go i j`
- To run unit test (if exist) for day n°i : `./run_test go i j`


### Few comments :

### - automatic init:

If you don't run on Ubuntu and if you don't have mozilla, you can't use the command to get automatically the input of the day. Moreover you need to have sqlite3 and to have mozilla closed !


## - day 1:

The first was quite an easy one, in this we get to know better javascript, how to import the input and to use reduce() function

## - day 2:

Nothing special about this day, the problem was also easy and solved quickly in javascript

## - day 3:

A harder problem than the two first,
after formating the input data we used a combination of map(),foreach() and reduce() functions to solve it in javascript

## - day 4:

For this problem, after formating the input in usable javascript array as a representation of the bingo board with map and reduce
we looped to find the winning board.

In the second part, as long as a board win we withdraw it from the list of boards and when only one is left, it is the solution.

## - day 5:

This day we first builf the board with the number of intersections.
For this we detect if the line id diagonal or not and then we trace it.

Once the board is build we use reduce() to give the answer.

## - day 6:


This day the naive approach worked well for the first part but in the second part, as the lisst was growing
exponetially the memory overflowed, so it was necessary to take a new approach with a list of static size.

## - day 7:

To solve part 2, we tested all solutions and selected the best one. A mathematical approach would directly have found the solution.

## - day 8:

This day part 2 was not easy at the first glance but once you see the trick is is quite easy.

To solve part 2 we looked for the number "contained" in other number to deduce every combinations,
we started with the easy numbers then deduced from them the numbers with 6 branchs and then the numbers with 5 branchs

## - day 9:

We solve the problem recusively

## - day 10:

This problem was interesting, as language semantic detection is a cool subject.

To solve it we used dictionnary and pile to stack the open parenthesis.

## - day 11:

This problem took us some time as we did not really understood how the octopus worked.
The problem was interresting to improve in javascript

## - day 12:

This problem was quite interesting,

To solve it we used recursive function to explore every possible path in the cave.

## - day 13:

This day the problem was not difficult in javascript once the data were formated.

## - day 14:

We used a dictionnary, which transforms a couple of letter 20 steps futher. Thus, the code is
slow but at least it worked.

## - day 15:

This day was interesting, we used djikstra algorithm.

But our code is really slow, even after optimisation it still takes dozen of seconds to compute.

## - day 17:

We tried all the solutions after finding mathematically area of ​​solutions

## - day 18:

The code is working for some example, some units tests have been made

## - day 20:

In this day at first the code was working for the example but not our input
because we did not took in consideration the fact that at the infinite the picture was switching between black and white each turn.
The trick was to use the '&' operator with the first item of the algorithm and the parity of the decrypting loop.

