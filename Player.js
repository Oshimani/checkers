export class Player {

    color = ""
    name = ""
    pieces = 0

    constructor(color, name) {
        this.color = color
        this.name = name
    }

    getColor() {
        return this.color === "white" ? "w" : "b"
    }

    setPieces(pieces) {
        this.pieces = pieces
    }

    render(currentPlayer) {
        let el = document.querySelector("#players #" + this.color)
        el.innerHTML = ""
        let player = document.createElement("div")
        player.classList.add("player")
        if (currentPlayer === this)
            player.classList.add("current-player")
        player.classList.add(this.getColor())
        player.innerHTML = this._renderText()
        el.appendChild(player)
    }

    _renderText() {
        return (
            `
<h1>${this.name}</h1>
<p>Pieces left: ${this.pieces}</p>
`
        )
    }
}