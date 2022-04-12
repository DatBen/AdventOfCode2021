package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"time"
)

func main() {
	start := time.Now()
	defer fmt.Println("execution time = ", time.Since(start))
	input := read_file("data/test")
	sum_lines(input)

}

type node struct {
	value  int
	left   *node
	right  *node
	parent *node
}

func sum_lines(input [][]string) *node {
	sum := lineToNode(input[0][0])
	for i := 1; i < len(input); i++ {
		new_node := lineToNode(input[i][0])
		sum = addNode(sum, new_node)
		reduce(sum)
		printNode(*sum)
	}
	return sum

}

func lineToNode(line string) *node {
	var base node
	var current *node
	var pile []*node
	n := len(line)
	side := "left"
	pile = append(pile, &base)
	for i := 1; i < n; i++ {
		current = pile[len(pile)-1]
		if string(line[i]) == "," {
			side = "right"
		} else if string(line[i]) == "[" {
			var new_node node
			new_node.parent = current

			if side == "left" {
				current.left = &new_node
			}
			if side == "right" {
				current.right = &new_node
			}
			pile = append(pile, &new_node)
			side = "left"
		} else if string(line[i]) == "]" {
			if len(pile)-1 >= 0 {
				pile = pile[:len(pile)-1]
			}
		} else {
			nb, _ := strconv.Atoi(string(line[i]))
			int_node := node{nb, nil, nil, current}
			if side == "left" {
				current.left = &int_node
			}
			if side == "right" {
				current.right = &int_node
			}
		}
	}
	return &base

}

func isPair(n node) bool {
	left := n.left
	right := n.right
	if left == nil && right == nil {
		return false
	}
	if left.left == nil && left.right == nil && right.left == nil && right.right == nil {
		return true
	}
	return false
}

func reduce(base *node) {
	expoldes(base)
	if split(base) {
		reduce(base)
	}
}

func split(base *node) bool {
	var pile []*node
	pile = append(pile, base)
	for len(pile) > 0 {
		current := pile[len(pile)-1]
		pile = pile[:len(pile)-1]
		if current.left == nil && current.right == nil {
			if current.value >= 10 {
				current.left = &node{int(math.Round(float64(current.value / 2))), nil, nil, current}
				current.right = &node{int(math.Round((float64(current.value) + 0.5) / 2)), nil, nil, current}
				current.value = 0
				return true
			}
		} else {
			pile = append(pile, current.right)
			pile = append(pile, current.left)
		}
	}
	return false
}

func expoldes(base *node) {
	var pile []*node
	pile = append(pile, base)
	for len(pile) > 0 {
		current := pile[len(pile)-1]
		pile = pile[:len(pile)-1]
		if isPair(*current) {
			if depth(*current) >= 4 {
				left := findFirstLeftNumber(*current)
				right := findFirstRightNumber(*current)
				if left != nil {
					left.value = left.value + current.left.value
				}
				if right != nil {
					right.value = right.value + current.right.value
				}
				*current = node{0, nil, nil, current.parent}
			}
		} else {
			if current.right != nil {
				pile = append(pile, current.right)
			}
			if current.left != nil {
				pile = append(pile, current.left)
			}
		}
	}
}

func findFirstRightNumber(n node) *node {
	parent := n.parent
	if parent == nil {
		return nil
	}
	if compareNode(parent.left, &n) {
		parent = parent.right
		for parent.left != nil && parent.right != nil {
			parent = parent.left
		}
		return parent

	} else {
		return findFirstRightNumber(*parent)
	}
}

func findFirstLeftNumber(n node) *node {
	parent := n.parent
	if parent == nil {
		return nil
	}
	if compareNode(parent.right, &n) {
		parent = parent.left
		for parent.left != nil && parent.right != nil {
			parent = parent.right
		}
		return parent

	} else {
		return findFirstLeftNumber(*parent)
	}

}

func compareNode(a *node, b *node) bool {
	if a == nil && b != nil || b == nil && a != nil {
		return false
	}
	if a == nil && b == nil {
		return true
	}
	if a.value == b.value {
		return compareNode(b.left, a.left) && compareNode(b.right, a.right)
	}
	return false
}

func addNode(a *node, b *node) *node {
	sum_node := node{0, a, b, nil}
	a.parent = &sum_node
	b.parent = &sum_node
	return &sum_node
}

func depth(n node) int {
	d := 0
	for n.parent != nil {
		d++
		n = *n.parent
	}
	return d
}

func printNodeHelper(base node) {
	if base.left == nil && base.right == nil {
		fmt.Print(base.value)
	} else {
		fmt.Print("[")
		printNodeHelper(*base.left)
		fmt.Print(",")
		printNodeHelper(*base.right)
		fmt.Print("]")
	}
}

func printNode(base node) {
	printNodeHelper(base)
	fmt.Println("")
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
