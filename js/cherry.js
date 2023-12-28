'use strict'

const CHERRY = '🍒'

var gCherryInterval


function addRandomCherry() {
	const emptyCell = getEmptyCell(gBoard)
	if (!emptyCell) return
	gBoard[emptyCell.i][emptyCell.j] = CHERRY
	renderCell(emptyCell, CHERRY)
}    

// //getting empty cell on board
// function getEmptyCell(board) {
// 	const emptyCells = []
// 	for (var i = 0; i < board.length; i++) {
// 		for (var j = 0; j < board[i].length; j++) {
// 			if (board[i][j] === FOOD)
// 				emptyCells.push({ i, j })
// 		}
// 	}

// 	if (!emptyCells.length) return null

// 	var randomIdx = getRandomInt(0, emptyCells.length - 1)
// 	return emptyCells[randomIdx]
// }