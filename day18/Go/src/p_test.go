package main

import "testing"

func GenerateNodes() (node, node, node, node, node) {
	nodeA := node{} //[1,2]
	nodeA1 := node{1, nil, nil, &nodeA}
	nodeA2 := node{2, nil, nil, &nodeA}
	nodeA.left = &nodeA1
	nodeA.right = &nodeA2
	nodeB := node{} //[1,2]
	nodeB1 := node{1, nil, nil, &nodeB}
	nodeB2 := node{2, nil, nil, &nodeB}
	nodeB.left = &nodeB1
	nodeB.right = &nodeB2
	nodeC := node{} //[1,3]
	nodeC1 := node{1, nil, nil, &nodeC}
	nodeC2 := node{3, nil, nil, &nodeC}
	nodeC.left = &nodeC1
	nodeC.right = &nodeC2
	nodeD := node{} //[[3,5],0]
	nodeD1 := node{0, nil, nil, &nodeD}
	nodeD2 := node{0, nil, nil, &nodeD}
	nodeD3 := node{3, nil, nil, &nodeD1}
	nodeD4 := node{5, nil, nil, &nodeD1}
	nodeD1.left = &nodeD3
	nodeD1.right = &nodeD4
	nodeD.left = &nodeD1
	nodeD.right = &nodeD2
	nodeE := node{} //[[3,5],0]
	nodeE1 := node{0, nil, nil, &nodeE}
	nodeE2 := node{0, nil, nil, &nodeE}
	nodeE3 := node{3, nil, nil, &nodeE1}
	nodeE4 := node{5, nil, nil, &nodeE1}
	nodeE1.left = &nodeE3
	nodeE1.right = &nodeE4
	nodeE.left = &nodeE1
	nodeE.right = &nodeE2
	return nodeA, nodeB, nodeC, nodeD, nodeE
}

func TestCompareNode(t *testing.T) {
	nodeA, nodeB, nodeC, nodeD, nodeE := GenerateNodes()
	tables := []struct {
		a   *node
		b   *node
		res bool
	}{
		{&nodeA, &nodeB, true},
		{&nodeB, &nodeA, true},
		{&nodeA, &nodeA, true},
		{&nodeA, &nodeC, false},
		{nil, &nodeC, false},
		{&nodeA, nil, false},
		{nil, nil, true},
		{&node{}, &node{}, true},
		{nodeC.right, nodeD.left.left, true},
		{&nodeD, &nodeE, true},
		{&nodeD, &nodeA, false},
	}
	for i, table := range tables {
		answer := compareNode(table.a, table.b)
		if answer != table.res {
			t.Errorf("Test n°%v was incorrect, got: %v, want: %v.", i, answer, table.res)
		}
	}
}

func TestLineToNode(t *testing.T) {
	nodeA, _, _, nodeD, _ := GenerateNodes()
	tables := []struct {
		line string
		node *node
		res  bool
	}{
		{"[1,2]", &nodeA, true},
		{"[[3,5],0]", &nodeD, true},
		{"[[3,5],5]", &nodeD, false},
	}
	for i, table := range tables {
		answer := compareNode(lineToNode(table.line), table.node)
		if answer != table.res {
			t.Errorf("Test n°%v was incorrect, got: %v, want: %v.", i, answer, table.res)
		}
	}
}

func TestIsPair(t *testing.T) {
	nodeA, _, _, nodeD, _ := GenerateNodes()
	tables := []struct {
		node *node
		res  bool
	}{
		{&nodeA, true},
		{&nodeD, false},
	}
	for i, table := range tables {
		answer := isPair(*table.node)
		if answer != table.res {
			t.Errorf("Test n°%v was incorrect, got: %v, want: %v.", i, answer, table.res)
		}
	}
}

func TestDepth(t *testing.T) {
	nodeA, _, _, nodeD, _ := GenerateNodes()
	tables := []struct {
		node *node
		res  int
	}{
		{&nodeA, 0},
		{&nodeD, 0},
		{nodeD.left, 1},
		{nodeD.left.left, 2},
	}
	for i, table := range tables {
		answer := depth(*table.node)
		if answer != table.res {
			t.Errorf("Test n°%v was incorrect, got: %v, want: %v.", i, answer, table.res)
		}
	}
}

func TestAddNode(t *testing.T) {
	nodeA, _, _, nodeD, _ := GenerateNodes()
	tables := []struct {
		a   *node
		b   *node
		c   *node
		res bool
	}{
		{&nodeA, &nodeD, lineToNode("[[1,2],[[3,5],0]"), true},
	}
	for i, table := range tables {
		answer := compareNode(addNode(table.a, table.b), table.c)
		if answer != table.res {
			t.Errorf("Test n°%v was incorrect, got: %v, want: %v.", i, answer, table.res)
		}
	}
}

func TestFindFirstLeftNumber(t *testing.T) {
	nodeA, _, _, nodeD, _ := GenerateNodes()
	tables := []struct {
		a   *node
		nb  int
		res bool
	}{
		{nodeA.right, 1, true},
		{nodeD.right, 5, true},
		{nodeA.left, -1, true},
		{nodeD.left.right, 3, true},
	}
	for i, table := range tables {
		var answer bool
		if findFirstLeftNumber(*table.a) != nil {
			answer = findFirstLeftNumber(*table.a).value == table.nb

		} else {
			answer = table.nb == -1
		}

		if answer != table.res {
			t.Errorf("Test n°%v was incorrect, got: %v, want: %v.", i, answer, table.res)
		}
	}
}

func TestFindFirstRightNumber(t *testing.T) {
	nodeA, _, _, nodeD, _ := GenerateNodes()
	tables := []struct {
		a   *node
		nb  int
		res bool
	}{
		{nodeA.left, 2, true},
		{nodeD.left, 0, true},
		{nodeD.left.right, 0, true},
		{nodeD.left.left, 5, true},
		{nodeA.right, -1, true},
	}
	for i, table := range tables {
		var answer bool
		if findFirstRightNumber(*table.a) != nil {
			answer = findFirstRightNumber(*table.a).value == table.nb

		} else {
			answer = table.nb == -1
		}

		if answer != table.res {
			t.Errorf("Test n°%v was incorrect, got: %v, want: %v.", i, answer, table.res)
		}
	}
}

func TestSplit(t *testing.T) {
	var r node
	r = node{0, &node{15, nil, nil, &r}, &node{2, nil, nil, &r}, nil}
	var c node
	c = node{0, &node{15, nil, nil, &c}, &node{15, nil, nil, &c}, nil}
	var x node
	x = node{0, &node{0, nil, nil, &x}, &node{15, nil, nil, &x}, nil}
	x.left.left = &node{7, nil, nil, x.left}
	x.left.right = &node{8, nil, nil, x.left}

	tables := []struct {
		a   *node
		b   *node
		res bool
	}{
		{&r, lineToNode("[[7,8],2]"), true},
		{&c, &x, true},
	}
	for i, table := range tables {
		split(table.a)
		answer := compareNode(table.a, table.b)
		if answer != table.res {
			t.Errorf("Test n°%v was incorrect, got: %v, want: %v.", i, answer, table.res)
		}
	}
}
