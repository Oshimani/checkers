import { Piece } from "./Piece.js"

export class Board {

    board = [[]]

    constructor() {
        this._intializeEmptyBoard()
        this.initializeWhitePieces()
        this.initializeBlackPieces()
    }

    _intializeEmptyBoard() {
        for (let i = 0; i < 8; i++) {
            this.board[i] = []
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = null
            }
        }
    }

    initializeBlackPieces() {
        this.setPiece(0, 1, new Piece("black"))
        this.setPiece(0, 3, new Piece("black"))
        this.setPiece(0, 5, new Piece("black"))
        this.setPiece(0, 7, new Piece("black"))

        this.setPiece(1, 0, new Piece("black"))
        this.setPiece(1, 2, new Piece("black"))
        this.setPiece(1, 4, new Piece("black"))
        this.setPiece(1, 6, new Piece("black"))

        this.setPiece(2, 1, new Piece("black"))
        this.setPiece(2, 3, new Piece("black"))
        this.setPiece(2, 5, new Piece("black"))
        this.setPiece(2, 7, new Piece("black"))
    }

    initializeWhitePieces() {
        this.setPiece(7, 0, new Piece("white"))
        this.setPiece(7, 2, new Piece("white"))
        this.setPiece(7, 4, new Piece("white"))
        this.setPiece(7, 6, new Piece("white"))

        this.setPiece(6, 1, new Piece("white"))
        this.setPiece(6, 3, new Piece("white"))
        this.setPiece(6, 5, new Piece("white"))
        this.setPiece(6, 7, new Piece("white"))

        this.setPiece(5, 0, new Piece("white"))
        this.setPiece(5, 2, new Piece("white"))
        this.setPiece(5, 4, new Piece("white"))
        this.setPiece(5, 6, new Piece("white"))
    }

    setPiece(x, y, piece) {
        this.board[x][y] = piece
    }

    getPiece(x, y) {
        return this.board[x][y]
    }

    printBoard() {
        console.log("Current Board:")
        for (let i = 0; i < 8; i++) {
            let row = []
            for (let j = 0; j < 8; j++) {
                row.push(this.getPiece(i, j) === null ? "-" : this.getPiece(i, j).getColor())
            }
            console.log(row.join("  "))
        }
    }

    renderBoard() {
        let board = document.getElementById("board")
        board.innerHTML = ""
        for (let i = 0; i < 8; i++) {
            let row = document.createElement("div")
            row.classList.add("row")
            for (let j = 0; j < 8; j++) {
                let square = document.createElement("div")
                square.classList.add("square")
                square.setAttribute("data-x", i)
                square.setAttribute("data-y", j)
                if (this.getPiece(i, j) !== null) {
                    square.classList.add(this.getPiece(i, j).getColor())
                    let piece = document.createElement("div")
                    piece.classList.add("piece")
                    piece.setAttribute("data-color", this.getPiece(i, j).getColor())
                    square.appendChild(piece)
                }
                row.appendChild(square)
            }
            board.appendChild(row)
        }
    }
}