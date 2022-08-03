import { Board } from "./Board.js";

export class Game {
    board

    constructor() {
        this.board = new Board()
        this.board.printBoard()
        this.board.renderBoard()
    }
}