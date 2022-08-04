import { game } from "./index.js"
import { Piece } from "./Piece.js"

export class Board {

    board = [[]]

    constructor() {
        this._intializeEmptyBoard()
        this.initializeWhitePieces()
        this.initializeBlackPieces()

        // Add Listeners to board
        document.getElementById("board").addEventListener("pointerup", (e) => {
            document.querySelectorAll("#board .valid-move, #board .potential-kill")
                .forEach(square => {
                    square.classList.remove("valid-move", "valid-move-move", "valid-move-kill", "potential-kill")
                })
        })
    }

    _intializeEmptyBoard() {
        for (let y = 0; y < 8; y++) {
            this.board[y] = []
            for (let x = 0; x < 8; x++) {
                this.board[y][x] = null
            }
        }
    }

    initializeBlackPieces() {
        this.setPiece(1, 0, new Piece("black"))
        this.setPiece(3, 0, new Piece("black"))
        this.setPiece(5, 0, new Piece("black"))
        this.setPiece(7, 0, new Piece("black"))

        this.setPiece(0, 1, new Piece("black"))
        this.setPiece(2, 1, new Piece("black"))
        this.setPiece(4, 1, new Piece("black"))
        this.setPiece(6, 1, new Piece("black"))

        this.setPiece(1, 2, new Piece("black"))
        this.setPiece(3, 2, new Piece("black"))
        this.setPiece(5, 2, new Piece("black"))
        this.setPiece(7, 2, new Piece("black"))
    }

    initializeWhitePieces() {
        this.setPiece(0, 7, new Piece("white"))
        this.setPiece(2, 7, new Piece("white"))
        this.setPiece(4, 7, new Piece("white"))
        this.setPiece(6, 7, new Piece("white"))

        this.setPiece(1, 6, new Piece("white"))
        this.setPiece(3, 6, new Piece("white"))
        this.setPiece(5, 6, new Piece("white"))
        this.setPiece(7, 6, new Piece("white"))

        this.setPiece(0, 5, new Piece("white"))
        this.setPiece(2, 5, new Piece("white"))
        this.setPiece(4, 5, new Piece("white"))
        this.setPiece(6, 5, new Piece("white"))
    }

    setPiece(x, y, piece) {
        this.board[y][x] = piece
    }

    getPiece(x, y) {
        return this.board[y][x]
    }

    print() {
        console.log("Current Board:")
        for (let y = 0; y < 8; y++) {
            let row = []
            for (let x = 0; x < 8; x++) {
                row.push(this.getPiece(x, y) === null ? "-" : this.getPiece(x, y).getColor())
            }
            console.log(row.join("  "))
        }
    }

    countPieces(color) {
        let count = 0
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.getPiece(i, j) !== null && this.getPiece(i, j).getColor() === color) {
                    count++
                }
            }
        }
        return count
    }

    isInBounds(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8
    }


    getValidMoves(x, y, piece) {
        let directions = piece.getPossibleDirections()
        let validMoves = []
        for (let direction of directions) {
            let newX = x + direction.x
            let newY = y + direction.y
            if (this.isInBounds(newX, newY)) {
                // is empty
                if (this.getPiece(newX, newY) === null) {
                    validMoves.push({ x: newX, y: newY, type: "move" })
                    continue
                }
                // Single kill
                if (this.getPiece(newX, newY).getColor() !== piece.getColor()) {
                    // check tile behind
                    let behindX = newX + direction.x
                    let behindY = newY + direction.y

                    if (this.isInBounds(behindX, behindY) && this.getPiece(behindX, behindY) === null) {
                        validMoves.push({ x: behindX, y: behindY, type: "kill", killAt: { x: newX, y: newY } })
                        continue
                    }
                }
            }
        }
        return validMoves
    }

    showValidMoves(x, y, piece) {
        let validMoves = this.getValidMoves(x, y, piece)
        for (let i = 0; i < validMoves.length; i++) {
            if (validMoves[i].type === "kill") {
                let killedSquare = document.querySelector(`.square[data-x="${validMoves[i].killAt.x}"][data-y="${validMoves[i].killAt.y}"]`)
                killedSquare.classList.add("potential-kill")
            }

            let square = document.querySelector(`.square[data-x="${validMoves[i].x}"][data-y="${validMoves[i].y}"]`)
            square.classList.add("valid-move")
            square.classList.add("valid-move-" + validMoves[i].type)


            // handle drop
            square.addEventListener("drop", (e) => {
                e.preventDefault()
                console.log("DROP EVENT");
                // remove highlighting of viable moves
                document.querySelectorAll("#board .valid-move")
                    .forEach(square => {
                        square.classList.remove("valid-move")
                        square.classList.remove("valid-move-move", "valid-move-kill")
                    })

                e.dataTransfer.dropEffect = "move";
                let from = JSON.parse(e.dataTransfer.getData('from'))
                this.movePiece(from.x, from.y, validMoves[i])
            })
            // alow drop
            square.addEventListener("dragover", (e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = "move";
            })
        }
    }

    movePiece(x, y, move) {
        let piece = this.getPiece(x, y)
        this.setPiece(move.x, move.y, piece)
        this.setPiece(x, y, null)
        if (move.type === "kill") {
            this.setPiece(move.killAt.x, move.killAt.y, null)
        }
        this.render()
        game.endTurn()
    }

    addListeners(piece, element) {

        let pos = {
            x: Number(element.getAttribute('data-x')),
            y: Number(element.getAttribute('data-y'))
        }

        element.addEventListener("pointerdown", () => {
            console.log("My color is: " + piece.getColor())
            this.showValidMoves(pos.x, pos.y, piece)
        })
        element.addEventListener("dragstart", (e) => {
            console.log("DRAG START");
            // e.dataTransfer.effectAllowed = "move";
            // e.dataTransfer.dropEffect = "move";
            e.dataTransfer.setData('from', JSON.stringify(pos))
        })

    }

    render() {
        let board = document.getElementById("board")
        board.innerHTML = ""
        for (let y = 0; y < 8; y++) {
            let row = document.createElement("div")
            row.classList.add("row")
            for (let x = 0; x < 8; x++) {
                let square = document.createElement("div")
                square.classList.add("square")
                square.setAttribute("data-x", x)
                square.setAttribute("data-y", y)
                // debug
                square.innerText = "X: " + x + " Y: " + y

                // PLACE PIECE
                if (this.getPiece(x, y) !== null) {
                    let piece = this.getPiece(x, y)
                    let element = piece.render(x, y)
                    this.addListeners(piece, element)

                    square.classList.add(piece.getColor())
                    square.appendChild(element)
                }
                row.appendChild(square)
            }
            board.appendChild(row)
        }
    }
}