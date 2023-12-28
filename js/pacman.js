'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 7, j: 7 },
        isSuper: false,
        rotate: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodCount--
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            eatGhost(nextCell)
        } else {
            gameOver()
            return
        }
    } else if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount--
    } else if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        eatSuperFood()
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }

    // TODO: hitting food? call updateScore

    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, getPacmanHtml(gPacman.deg))

}

function getNextLocation(eventKeyboard) {
    const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            gPacman.deg = 180
            nextLocation.i--
            break;

        case 'ArrowDown':
            gPacman.deg = 0
            nextLocation.i++

            break;

        case 'ArrowLeft':
            gPacman.deg = 90
            nextLocation.j--
            break;

        case 'ArrowRight':
            gPacman.deg = -90
            nextLocation.j++
            break;

        default: return null
    }
    return nextLocation
}

function getPacmanHtml(rotate) {
    return `<div style="transform:rotate(${rotate}deg)">${PACMAN}</div>`
}

function eatGhost(ghostLocation) {
    // delet the ghost from the live and add it to the dead
    for (let i = 0; i < gGhosts.length; i++) {
        var currLocation = gGhosts[i].location;
        if (currLocation.i === ghostLocation.i && currLocation.j === ghostLocation.j) {
            const deadGhost = gGhosts.splice(i, j)[0]
            checkCellContent(deadGhost)
            gDeadGhosts.push(deadGhost)
        }
    }
}

function checkCellContent(ghost) {
    if (ghost.currCellContent === FOOD) {
        console.log(ghost.currCellContent)
        eatFood()
        ghost.currCellContent = EMPTY
    }
}

function eatSuperFood() {
    gPacman.isSuper = true
    renderGhosts()
    setTimeout(() => {
        gPacman.isSuper = false
        aliveGhosts()
        renderGhosts()
    }, 5000)
}

function eatFood() {
    gGame.foodCount--
    updateScore(1)
    victory()
}

