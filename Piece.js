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
}
