export class Piece {
    
    color = ""
    constructor(color) {
        this.color = color
    }

    getColor() {
        return this.color === "white" ? "w" : "b"
    }

}