'use strict'

const WALL = '🌫️'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🫐'

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0

}

var gBoard



function init() {
    console.log('hello')

    document.querySelector('.board-container').style.display = 'block'
    document.querySelector('.gameover').style.display = 'none'
    document.querySelector('.winner').style.display = 'none'

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    gCherryInterval = setInterval(addRandomCherry, 20000)

    renderBoard(gBoard, '.board-container')


    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 4 && i > 3 && i < size - 3)) {
                board[i][j] = WALL
                gGame.foodCount--

            }

        }
    }
    addSuperFood(board)
    return board
}

function addSuperFood(board) {
    board[1][1] = SUPERFOOD
    board[1][board[0].length - 2] = SUPERFOOD
    board[board.length - 2][1] = SUPERFOOD
    board[board.length - 2][board[0].length - 2] = SUPERFOOD
    gGame.foodCount -= 4
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gGhostsInterval)
    clearInterval(gCherryInterval)


    document.querySelector('.board-container').style.display = 'none'
    document.querySelector('.gameover').style.display = 'block'
    gGame.isOn = false
}

function victory() {
    if (gGame.foodCount === 0) {

        console.log('You Won!')
        clearInterval(gGhostsInterval)
        clearInterval(gCherryInterval)


        document.querySelector('.board-container').style.display = 'none'
        document.querySelector('.winner').style.display = 'block'

    }

    gGame.isOn = false
}