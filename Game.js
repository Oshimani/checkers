import { Board } from "./Board.js";
import { Player } from "./Player.js";

export class Game {
    board

    players = []
    currentPlayer = null
    currentTurn = 0

    constructor() {
        this.board = new Board()
        this.players = [new Player("white", "Ich"), new Player("black", "AI")]
        this.currentPlayer = this.players[0]
    }

    start() {
        this.board.render()
        this.board.print()
        this.updatePlayers(this.currentPlayer)
        board.classList.add(this.currentPlayer.getColor())

    }

    endTurn() {
        this.currentTurn++
        const board = document.querySelector("#board")
        board.classList.remove(this.currentPlayer.getColor())

        this.currentPlayer = this.players[this.currentTurn % 2]

        board.classList.add(this.currentPlayer.getColor())
        this.updatePlayers(this.currentPlayer)
    }

    updatePlayers(currentPlayer) {
        this.players.forEach(p => {
            p.setPieces(this.board.countPieces(p.getColor()))
            p.render(currentPlayer)
        })
    }
}