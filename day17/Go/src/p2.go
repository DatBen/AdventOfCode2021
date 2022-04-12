package main

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
	run()
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

type Probe struct {
	x    int
	y    int
	vX   int
	vY   int
	ymax int
}

func isInArea(p Probe) bool {
	xmin := 201
	xmax := 230
	ymax := -99
	ymin := -65
	if p.y >= ymax && p.y <= ymin && p.x >= xmin && p.x <= xmax {
		return true
	}
	return false
}

func next_step(p *Probe) bool {
	xmax := 230
	ymax := -99
	if isInArea(*p) || p.y <= ymax || p.x >= xmax {
		return false
	}
	p.x += p.vX
	p.y += p.vY
	if p.vX > 0 {
		p.vX -= 1
	}
	p.vY -= 1
	if p.ymax < p.y {
		p.ymax = p.y
	}
	return true
}

func run() {
	count := 0
	for j := -100; j <= 100; j++ {
		for i := 0; i <= 230; i++ {
			probe := Probe{0, 0, i, j, 0}
			for next_step(&probe) {
			}
			if isInArea(probe) {
				count++
			}
		}
	}
	fmt.Println(count)
}
