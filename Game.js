import { Board } from "./Board.js";
import { Player } from "./Player.js";

export class Game {
    board

    players = []

    constructor() {
        this.board = new Board()
        this.players = [new Player("white", "Ich"), new Player("black", "AI")]

        this.board.render()
        this.board.print()
        this.updatePlayers()
    }

    updatePlayers() {
        this.players.forEach(p => {
            p.setPieces(this.board.countPieces(p.getColor()))
            p.render()
        })
    }
}