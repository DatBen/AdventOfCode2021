package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"time"
)

type pos struct {
	x int
	y int
}

func main() {
	start := time.Now()
	defer fmt.Println("execution time = ", time.Since(start))
	input := read_file("data/input")
	im := array(input)
	al := gen_algo(input)
	solve(im, al, 50)
}

func solve(im [][]int, al []int, n int) {

	res := im

	for i := 0; i < n; i++ {
		res = decrypt(res, al, i%2)
	}

	fmt.Println(nma(res))
}

func decrypt(arr [][]int, algo []int, pass int) [][]int {

	newIm := make([][]int, 0)

	for y := -1; y < len(arr)+1; y++ {
		line := make([]int, 0)
		for x := -1; x < len(arr[0])+1; x++ {
			line = append(line, algo[getIndex(x, y, arr, algo, pass)])

		}
		newIm = append(newIm, line)
	}

	return newIm

}

func prt(entry [][]int) {
	for i := 0; i < len(entry); i++ {
		fmt.Println(entry[i])
	}
}

func nma(input [][]int) int {
	cpt := 0
	for _, l := range input {
		for _, c := range l {
			cpt = cpt + c
		}
	}
	return cpt
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

func getIndex(x int, y int, arr [][]int, algo []int, pass int) int {

	st := make([]int, 0)

	neigh := [][]int{[]int{-1, -1}, []int{0, -1}, []int{+1, -1}, []int{-1, 0}, []int{0, 0}, []int{1, 0}, []int{-1, +1}, []int{0, 1}, []int{1, 1}}
	for _, pt := range neigh {
		if checkBoundaries(arr, x+pt[0], y+pt[1]) {

			st = append(st, arr[y+pt[1]][x+pt[0]])
		} else {
			st = append(st, algo[0]&pass)
		}

	}
	res := 0

	for i := len(st) - 1; i > -1; i = i - 1 {
		res = res + st[i]*int(math.Pow(float64(2), float64(len(st)-1-i)))
	}

	return res
}

func checkBoundaries(arr [][]int, x int, y int) bool {
	if x < 0 || y < 0 {
		return false
	}

	if x > len(arr[0])-1 || y > len(arr)-1 {
		return false
	}

	return true

}

func array(entry [][]string) [][]int {
	res := make([][]int, 0)
	for i := 2; i < len(entry); i++ {

		line := make([]int, 0)
		for _, char := range entry[i][0] {
			line = append(line, mapper(char))

		}
		res = append(res, line)

	}
	return res
}

func gen_algo(entry [][]string) []int {
	ret := make([]int, 0)
	for _, char := range entry[0][0] {
		ret = append(ret, mapper(char))
	}

	return ret

}

func mapper(in rune) int {
	if in == '#' {
		return 1
	}
	return 0
}
