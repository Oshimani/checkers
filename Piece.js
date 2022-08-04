import { game } from "./index.js"

export class Piece {

    color = ""
    constructor(color) {
        this.color = color
    }

    getColor() {
        return this.color === "white" ? "w" : "b"
    }

    getPossibleDirections() {
        if (this.getColor() === "w") {
            return [
                { x: -1, y: -1 },
                { x: 1, y: -1 },
            ]
        }
        else {
            return [
                { x: -1, y: 1 },
                { x: 1, y: 1 },
            ]
        }
    }

    render(x, y) {
        let element = document.createElement("div")
        element.classList.add("piece")
        element.setAttribute("data-x", x)
        element.setAttribute("data-y", y)
        element.setAttribute("data-color", this.getColor())
        if (game.currentPlayer.getColor() === this.getColor())
            element.setAttribute("draggable", "true")
        return element
    }
}
