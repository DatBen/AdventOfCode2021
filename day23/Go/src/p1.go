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

